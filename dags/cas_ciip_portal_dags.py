# -*- coding: utf-8 -*-
import json
from dag_configuration import default_dag_args
from trigger_k8s_cronjob import trigger_k8s_cronjob
from reload_nginx_containers import reload_nginx_containers
from walg_backups import create_backup_task
from airflow.operators.python import PythonOperator, BranchPythonOperator
from datetime import datetime, timedelta
from airflow import DAG
import os


YESTERDAY = datetime.now() - timedelta(days=1)
TWO_DAYS_AGO = datetime.now() - timedelta(days=2)

namespace = os.getenv('CIIP_NAMESPACE')

ciip_deploy_db_args = {
    **default_dag_args,
    'start_date': YESTERDAY,
    'is_paused_upon_creation': False
}

"""
DAG cas_ciip_portal_ciip_deploy_db.
Initializes the portal database and deploys the schema/data.
If we're in the test namespace, dag first restores data from prod and then imports data from swrs.
"""
deploy_db_dag = DAG('cas_ciip_portal_deploy_db', schedule_interval=None,
                    default_args=ciip_deploy_db_args)


def _pick_data_import():
    is_test = (namespace.split("-")[-1] == 'test')
    if is_test:
        return 'cas_ciip_portal_prod_restore'
    else:
        return 'ciip_portal_swrs_import'


def pick_data_import(dag):
    return BranchPythonOperator(
        python_callable=_pick_data_import,
        task_id='pick_data_import',
        dag=dag
    )


def ciip_portal_init_db(dag):
    return PythonOperator(
        python_callable=trigger_k8s_cronjob,
        task_id='ciip_portal_db_init',
        op_args=['cas-ciip-portal-init-db', namespace],
        dag=dag)


def ciip_portal_swrs_import(dag):
    return PythonOperator(
        python_callable=trigger_k8s_cronjob,
        task_id='ciip_portal_swrs_import',
        op_args=['cas-ciip-portal-swrs-import', namespace],
        dag=dag)


def ciip_portal_deploy_data(dag):
    return PythonOperator(
        python_callable=trigger_k8s_cronjob,
        task_id='ciip_portal_deploy_data',
        op_args=['cas-ciip-portal-schema-deploy-data', namespace],
        trigger_rule='none_failed',
        dag=dag)


def ciip_portal_graphile_schema(dag):
    return PythonOperator(
        python_callable=trigger_k8s_cronjob,
        task_id='ciip_portal_graphile_schema',
        op_args=['cas-ciip-portal-init-graphile-schema', namespace],
        dag=dag)


def ciip_portal_app_user(dag):
    return PythonOperator(
        python_callable=trigger_k8s_cronjob,
        task_id='ciip_portal_app_user',
        op_args=['cas-ciip-portal-app-user', namespace],
        dag=dag)



ciip_portal_init_db(deploy_db_dag) >> pick_data_import(deploy_db_dag) >> ciip_portal_swrs_import(deploy_db_dag) >> ciip_portal_deploy_data(deploy_db_dag) >> ciip_portal_graphile_schema(
    deploy_db_dag) >> ciip_portal_app_user(deploy_db_dag)


###################################################

acme_renewal_args = {
    **default_dag_args,
    'start_date': TWO_DAYS_AGO,
    'is_paused_upon_creation': False
}

"""
DAG cas_ciip_portal_acme_issue
Issues site certificates for the CIIP portal
"""
acme_issue_dag = DAG('cas_ciip_portal_acme_issue',
                     schedule_interval=None, default_args=acme_renewal_args)

cron_acme_issue_task = PythonOperator(
    python_callable=trigger_k8s_cronjob,
    task_id='ciip_portal_acme_issue',
    op_args=['cas-ciip-portal-acme-issue', namespace],
    dag=acme_issue_dag)


"""
DAG cas_ciip_portal_acme_renewal
Renews site certificates for the CIIP portal
"""
acme_renewal_dag = DAG('cas_ciip_portal_acme_renewal', schedule_interval='0 8 * * *',
                       default_args=acme_renewal_args)

cert_renewal_task = PythonOperator(
    python_callable=trigger_k8s_cronjob,
    task_id='cert_renewal',
    op_args=['cas-ciip-portal-acme-renewal', namespace],
    dag=acme_renewal_dag)

reload_nginx_task = PythonOperator(
    python_callable=reload_nginx_containers,
    task_id='cas_ciip_portal_reload_nginx',
    op_args=['cas-ciip-portal', namespace],
    dag=acme_renewal_dag)

cert_renewal_task >> reload_nginx_task

"""
###############################################################################
#                                                                             #
# DAG triggering the wal-g backup job                                         #
#                                                                             #
###############################################################################
"""

default_args = {
    **default_dag_args,
    'start_date': TWO_DAYS_AGO,
    'is_paused_upon_creation': False
}


ciip_full_backup_dag = DAG('walg_backup_ciip_full', default_args=default_args,
                           schedule_interval='0 8 * * *')

create_backup_task(ciip_full_backup_dag,
                   namespace, 'cas-ciip-portal-patroni')
