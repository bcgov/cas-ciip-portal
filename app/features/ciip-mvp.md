CIIP MVP (70%)
==============

Current target: December 27th.

Industry can apply for CIIP
---------------------------

  - login ([authentication](./industry/authentication.feature) + [registration](./industry/registration.feature))
  - refactored application form to enable [pre-fill of data from SWRS](./industry/dry.feature)
  - can [view](./industry/ciip-filing.feature) previous years reports
  - can [resume](./industry/ciip-filing.feature) in progress applications
  - [admin data pre-filled](./industry/dry.feature) from SWRS for every reporting year
  - ability for reporter to view flagged data and [correct it](./industry/ciip-filing.feature)
  - can receive [email notifications](./industry/email.feature) from CIIP portal
  - email notification could contain a link to [flagged data for correction](./industry/email.feature)
  - [certification](./industry/ciip-filing.feature) request
  - [legal disclaimer](./industry/registration.feature)
  - incorporation of feedback from first user study [PENDING]

System Admin
------------

  - can create [products](./admin/products.feature) and [benchmarks](./admin/benchmarks.feature)
  - can [authorize incentive analysts](./admin/authorization.feature)

Incentive Analyst
-----------------

  - can view [dashboard](./analyst/ciip-filings.feature) of application reports
  - can [flag specific portions](./analyst/ciip-filings.feature) of the reports
  - can update status of reports (split to [approve](./analyst/ciip-filings.feature) and [reject](./analyst/ciip-filings.feature))
  - can view [logs of all actions](./analyst/ciip-filings.feature) taken on a report
  - can view [incentive calculation](./analyst/ciip-filings.feature)

Report Validation System
------------------------

  - merge CIIP and SWRS data [on BCGHGID](./industry/dry.feature)

[Deploy to Prod](./executive/availability.feature)
--------------

Storage and [Backups](./executive/business-continuity.feature)
-------------------

[Expose changes](./analyst/ciip-filings.feature) to SWRS made in CIIP application
---------------------------------------------------------------------------------

Compliant [database design](./executive/business-continuity.feature)
--------------------------------------------------------------------

Automatically [get SWRS data](./industry/dry.feature)
-----------------------------------------------------

[Carbon tax calculation](./analyst/ciip-filings.feature) based on CIIP-reported data (not SWRS)
-------------------------------------------------------------
