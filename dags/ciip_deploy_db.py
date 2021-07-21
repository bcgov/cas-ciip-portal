# -*- coding: utf-8 -*-
"""
# DAGs to deploy the ciip portal.
ciip_deploy_db will initialize the portal database and import the swrs data
cron_acme_issue will issue a certificate for the CIIP portal
"""
import json
from dag_configuration import default_dag_args
from trigger_k8s_cronjob import trigger_k8s_cronjob
from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta
from airflow import DAG
import os
import sys

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))


YESTERDAY = datetime.now() - timedelta(days=1)

namespace = os.getenv('CIIP_NAMESPACE')

default_args = {
    **default_dag_args,
    'start_date': YESTERDAY
}

DAG_ID = os.path.basename(__file__).replace(".pyc", "").replace(".py", "")
SCHEDULE_INTERVAL = None

default_dag = DAG(DAG_ID, schedule_interval=SCHEDULE_INTERVAL,
                  default_args=default_args)
test_dag = DAG(DAG_ID + '_test',
               schedule_interval=SCHEDULE_INTERVAL, default_args=default_args)


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


def ciip_portal_prod_test_restore(dag):
    return PythonOperator(
        python_callable=trigger_k8s_cronjob,
        task_id='cas-ciip-portal-prod-test-restore',
        op_args=['cas-ciip-portal-prod-test-restore', namespace],
        dag=dag)


ciip_portal_init_db(default_dag) >> ciip_portal_swrs_import(default_dag) >> ciip_portal_deploy_data(
    default_dag) >> ciip_portal_graphile_schema(default_dag) >> ciip_portal_app_user(default_dag)
ciip_portal_init_db(test_dag) >> ciip_portal_prod_test_restore(test_dag) >> ciip_portal_deploy_data(
    test_dag) >> ciip_portal_graphile_schema(test_dag) >> ciip_portal_app_user(test_dag)

acme_issue_dag = DAG('ciip_portal_acme_issue',
                     schedule_interval=SCHEDULE_INTERVAL, default_args=default_args)

cron_acme_issue_task = PythonOperator(
    python_callable=trigger_k8s_cronjob,
    task_id='ciip_portal_acme_issue',
    op_args=['cas-ciip-portal-acme-issue', namespace],
    dag=acme_issue_dag)
