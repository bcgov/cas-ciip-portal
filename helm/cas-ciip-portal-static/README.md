


Installation

0. (Prerequisite) Make sure that there is no route with the host that already exists - or delete it manually.

1. helm install with route insecure
2. manually run issue cronjob
3. helm upgrade with route secure
4. restart pod
5. update renew cronjob with schedule `0 0 1 * *` or `@monthly`
