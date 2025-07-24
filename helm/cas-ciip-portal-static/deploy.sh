#! /bin/bash

set -euo pipefail;
helm dep up;

export OC_PROJECT="$CIIP_NAMESPACE_PREFIX-$ENVIRONMENT";

if ! helm status --namespace $OC_PROJECT ciip-static; then \
    helm install --atomic --wait --timeout 2400s --namespace $OC_PROJECT \
    --set route.insecure=true \
    --set nginx-sidecar.sslTermination=false \
    --values values-$ENVIRONMENT.yaml \
    ciip-static .; \

    oc create job --from=cronjob/cas-ciip-portal-static-acme-issue ciip-static-acme-issue -n $OC_PROJECT;
    oc wait --for=condition=complete --timeout=600s job/ciip-static-acme-issue -n $OC_PROJECT;
fi;

helm upgrade --install --atomic --wait --timeout 2400s --namespace $OC_PROJECT \
  --values values-$ENVIRONMENT.yaml \
  ciip-static .;

# Reload new nginx config with ssl turned on
oc rollout restart deployment --selector=app.kubernetes.io/instance=ciip-static -n $OC_PROJECT;
