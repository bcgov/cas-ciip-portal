
# -*- coding: utf-8 -*-
"""
# DAG triggering the cas-ciip-portal-acme-renewal cron job
"""
from dag_configuration import default_dag_args
from trigger_k8s_cronjob import trigger_k8s_cronjob
from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta
from airflow import DAG
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))


START_DATE = datetime.now() - timedelta(days=2)

namespace = os.getenv('CIIP_NAMESPACE')

default_args = {
    **default_dag_args,
    'start_date': START_DATE
}

DAG_ID = os.path.basename(__file__).replace(".pyc", "").replace(".py", "")
SCHEDULE_INTERVAL = '0 8 * * *'

dag = DAG(DAG_ID, schedule_interval=SCHEDULE_INTERVAL,
          default_args=default_args)

cert_renewal_task = PythonOperator(
    python_callable=trigger_k8s_cronjob,
    task_id='cert_renewal',
    op_args=['cas-ciip-portal-acme-renewal', namespace],
    dag=dag)
