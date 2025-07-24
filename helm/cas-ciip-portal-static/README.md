


### Installation of the ciip-static chart:

0. (Prerequisite) Make sure that there is no CIIP route with the host that already exists - delete it manually.
1. Ensure `CIIP_NAMESPACE_PREFIX` and `ENVIRONMENT` env vars are set
2. Run `./deploy.sh`

### Script operation order

1. helm install with route insecure
2. manually run issue cronjob
3. helm upgrade with route secure
4. restart pod
