# Pages and shared components inventory, by scope

Link to each heading for details. Asterisk\* denotes pages that [require certain query parameters](#query-parameters) to be appended to the URL to prevent error.

### [Industry User](#industry-user-role)

- [Reporter Dashboard: `/reporter`](#reporter-dash)
- [Facilities page, _aka._ "My Applications": `/reporter/facilities`](#facilities)
- [New Application Disclaimer page: `/reporter/new-application-disclaimer`\*](#new-application-disclaimer)
- [Application page: `/reporter/application`\*](#application)
- [Submission Complete page: `/reporter/complete-submit`](#submission-complete)
- [View Submitted Application page: `/reporter/view-application`\*](#view-application)
- [Certification redirect page `/certifier/certification-redirect`\*](#certification-redirect)
- [Application Certification page `/certifier/certify`\*](#certification)
- [Certification Requests and Batch Certification page `/certifier/requests`](#certification-requests)

### [Analyst](#analyst-role)

- [Pending Analyst page `/analyst/pending`](#pending-analyst)
- [Analyst Dashboard `/analyst`](#analyst-dash)
- [Add Organisation page `/analyst/add-organisation`](#add-organisation)
- [Add Facility page `/analyst/add-facility`](#add-facility)
- [Organisation Access Requests page `/analyst/organisation-requests`](#org-access)
- [Applications Admin page `/analyst/applications`](#applications-admin)
- [Application Review page `/analyst/application-review`\*](#application-review)

### [Admin](#admin-role)

- [Admin Dashboard `/admin`](#admin-dash)
- [Users Admin page `/admin/users`](#admin-users)
- [Products and Benchmarks admin page `/admin/products-benchmarks`](#admin-products)
- [Reporting Periods admin page `/admin/reporting-years`](#reporting-periods)

### [All user roles (logged in)](#all-roles)

- [Registration page `/registration`](#registration)
- [User Profile page: `/user/profile`](#user-profile)

### [Guest/Public](#guest-role)

- [Home page `/`](#homepage)
- [Login Redirect page `/login-redirect`\*](#login-redirect)
- [CIIP Application Disclaimer `/resources/application-disclaimer`](#application-disclaimer)
- ['Page Not Found' page (_aka._ 404)](#page-404)
- [403 page (temporary; handles redirection after registration bug) `/403`](#page-403)
- [Unknown Error page, _aka._ ErrorBoundary `(any URL)`](#error-boundary)
- [BCGov-wide Website Disclaimer `/resources/disclaimer`](#website-disclaimer)
- [BCGov-wide Privacy Statement `/resources/privacy`](#privacy)
- [BCGov-wide Copyright Statement `/resources/copyright`](#copyright)
- [Contact page `/resources/contact`](#contact)

### [Note on required query parameters](#query-parameters)

### [Globally shared components](#global-components)

_______

<a id="industry-user-role"></a>

## Industry User

Industry users (reporters and certifiers) must log in using a user name or email address and are not expected to have an IDIR.

<a id="reporter-dash"></a>

### Reporter Dashboard: `/reporter`

View and request access to operators to apply for CIIP on behalf of.

#### Shared components:
- `Organisation` (dropdown item in organisation search)

<a id="facilities"></a>

### Facilities page, _aka._ "My Applications": `/reporter/facilities`

View facilities for operators to which the user has access and on behalf of which they can apply for CIIP. The listings provide links to the following actions for each facility:

  - a) start an application
  - b) resume an in-progress application
  - c) view a submitted application

**Note:** When navigating to this page via "My Applications", all applications from all the user's facilities and operators are listed. Otherwise when navigating here by clicking on an individual operator, this page shows just the applications for the facilities belonging to that operator.

#### Shared components:
- `SearchTable`

<a id="new-application-disclaimer"></a>

### New Application Disclaimer page: `/reporter/new-application-disclaimer`\*

Interstitial page that collects the reporter's consent before allowing a new application to be started.

\* Required query parameters:
- `applicationId`
- `version`

<a id="application"></a>

### Application page: `/reporter/application`\*

A set of forms, displayed in sequential tabs, allowing reporters to apply for CIIP for a specified facility.

The form tab (ie: Emissions, etc.) initially displayed on loading this page is controlled by the value of the `formResultId` query parameter. Further, the page can be loaded to display the Summary tab by appending the parameter: `confirmationPage=true` _instead_ of `formResultId`.

Form validation helps ensure the integrity of data entered before submission; however, this can be overridden by the reporter with a message justifying their reasons for not being able to fix the validation errors.

\* Required query parameters:
- `applicationId`
- `version`
- `formResultId` (except when `confirmationPage` is present)
- \[optional parameter for showing Summary tab\]: `confirmationPage=true`

#### Shared components:
- `FormSharedStyles`
- `ApplicationDetailsContainer`

<a id="submission-complete"></a>

### Submission Complete page: `/reporter/complete-submit`

Interstitial page shown after submitting an application, which confirms the application has been successfully submitted.

<a id="view-application"></a>

### View Submitted Application page: `/reporter/view-application`\*

View a submitted application, including comments made by the analyst who reviewed the applications.

\* Required query parameters:
- `applicationId`
- `version`

#### Shared components:
- `ApplicationComments`
- `ApplicationDetailsContainer`

<a id="certification-redirect"></a>

### Certification redirect page `/certifier/certification-redirect`\*

Summarizes who is requesting that the user certify an application, and for which operator and facility. Links to the individual certification page with application details and signing interface. This page is the same URL shared by the reporter with the certifier when they click "Submit for Certification" on an application, through an automated email and/or the copy-to-clipboard feature.

As with all other pages requiring login, certifiers following the link in their email who are not already logged in will first be redirected through login and back to this page.

\* Required query parameters:
- `rowId` (refers to the corresponding `certification_url`)
- `id` (refers to the corresponding `application_revision`)

<a id="certification"></a>

### Application Certification page `/certifier/certify`\*

Displays the detailed data submitted in the application to be certified and provides a signature interface with legal disclaimer (displayed in a scrollable area) that is agreed to when certifying the application. A link is provided to expand the disclaimer text as full page in a new tab. The signature interface can be used by clicking and dragging the pointer within the signature box, or by uploading a signature image.

\* Required query parameters:
- `applicationId`
- `version`

#### Shared components:
- `ApplicationDetailsContainer`
- `CertificationSignature`
- `SignatureDisclaimerCard`
  * `LegalDisclaimerText`

<a id="certification-requests"></a>

### Certification Requests and Batch Certification page `/certifier/requests`

View requests made to certify applications addressed to the user's email address, including links to view the individual application details. List is searchable and sortable by facility, operator, request status, certifier and certification date; certifiers with many requests can select multiple requests to show the signing interface and certify all selected applications at once.

Once certified, the requests do not disappear, serving as a historical record of applications the user has certified.

#### Shared components:
- `CertificationSignature`
- `SignatureDisclaimerCard`
  * `LegalDisclaimerText`

_______

<a id="analyst-role"></a>

## Analyst

Analysts must log in with IDIR. To gain access to this scope, new analyst users must:
- log in using IDIR
- be specifically granted analyst access in Keycloak by an admin

<a id="pending-analyst"></a>

### Pending Analyst page `/analyst/pending`

Displayed to users logged in with IDIR but who have not had analyst access granted to them in Keycloak. The user is informed that an admin will need to grant them access.

<a id="analyst-dash"></a>

### Analyst Dashboard `/analyst`

Links to all pages accessible from this scope (analyst and admin views), including external links to:
- Metabase for data insights, aka. business intelligence

<a id="add-organisation"></a>

### Add Organisation page `/analyst/add-organisation`

Add a new operator (aka. organisation). Search and sort the list of existing operators and view their details, such as CRA Business Number and SWRS Report ID.

#### Shared components:
- `Organisation` (dropdown item in organisation search)

<a id="add-facility"></a>

### Add Facility page `/analyst/add-facility`

Add a new facility belonging to an existing operator. Search and sort the list of existing facilities and view their details, such as Operator Name, facility type, BCGHG ID, and SWRS Report ID.

<a id="org-access"></a>

### Organisation Access Requests page `/analyst/organisation-requests`

- List all reporter requests for access to an operator and see access decisions (approved or rejected) on past requests.
- Make access decisions by approving or rejecting requests.
- Requests do not disappear after a decision is made and can be reset if it's later decided to change a given access decision.
- List of requests is searchable and sortable by various attributes pertaining to the user, operator and request status.

#### Shared components:
- `SearchTable`

<a id="applications-admin"></a>

### Applications Admin page `/analyst/applications`

View all submitted applications. The list of applications is searchable and sortable by operator, facility, reporting year, submission date and status.

#### Shared components:
- `SearchTable`

<a id="application-review"></a>

### Application Review page `/analyst/application-review`\*

Review a submitted application, section by section.
- Compare the difference (diff) between application revisions and/or the imported data from SWRS
- Enter comments by section for the reporter
  * comments are not visible to the reporter until a decision is made on the application as a whole
- Add internal comments by section and flag sections internally for further attention by analysts
- Delete comments or mark comments as resolved
- Make a decision to approve or reject an application, or request that the reporter make changes
  * these decisions trigger an email to the reporter

\* Required query parameters:
- `applicationId`
- `applicationRevisionId`
- `version`

#### Shared components:
- `ApplicationComments`

_______

<a id="admin-role"></a>

## Admin

Admins must log in with IDIR. To gain access to this scope, new admin users must:
- log in using IDIR
- be specifically granted admin access in Keycloak by an existing admin

Admin users have access to all the views listed under the analyst scope, plus the following:

<a id="admin-dash"></a>

### Admin Dashboard `/admin`

Links to all pages accessible from this scope (analyst and admin views), including external links to:
- Shipit for deployment
- Airflow for DevOps orchestration
- Metabase for data insights, aka. business intelligence

<a id="admin-users"></a>

### Users Admin page `/admin/users`

View a list of all users: their name, occupation, phone number and email address.

<a id="admin-products"></a>

### Products and Benchmarks admin page `/admin/products-benchmarks`

View and edit a list of products, with benchmarks.
- Search and sort the list by product attributes
- Define links between products that should be reported together
- View product details
- Edit product benchmarks
- Create new products as a draft
- Publish draft products
- Archive published products

#### Shared components:
- `SearchTable`

<a id="reporting-periods"></a>

### Reporting Periods admin page `/admin/reporting-years`

View reporting periods and their key dates, edit future dates, and create new reporting years. To ensure an accurate historical record, dates and times cannot be edited once they are past. A reporting period cannot be deleted once created; however, it can be edited provided that the dates and times are not past.

#### Shared components:
- `FormSharedStyles`

_______

<a id="all-roles"></a>

## All user roles (logged in)

<a id="registration"></a>

### Registration page `/registration`

Shown after SSO registration (which occurs offsite on the BCGov Keycloak service), this is the first page that a newly registered user sees on the website. It collects some additional information - phone number and occupation - not already covered in the SSO registration and redirects the user to their dashboard after submission.

<a id="user-profile"></a>

### User Profile page: `/user/profile`

View and change name, occupation, phone number and email address.

_______

<a id="guest-role"></a>

## Guest/Public Scope (not logged in)

<a id="homepage"></a>

### Home page `/`

Gives an overall introduction to CIIP, including key application dates and call to action to register and apply, or log in.

#### Shared components:
- `RegistrationLoginButtons`
  * `LoginButton`

<a id="login-redirect"></a>

### Login Redirect page `/login-redirect`\*

\* Query parameters are not actually required here to prevent an error, but this page is intended to be used in conjunction with a `redirectTo` parameter indicating the URL to redirect to after login.

#### Shared components:
- `RegistrationLoginButtons`
  * `LoginButton`

<a id="application-disclaimer"></a>

#### CIIP Application Disclaimer `/resources/application-disclaimer`

Expanded view of the CIIP program-specific applicant disclaimer. Identical text is displayed in a scrollable area above the signature interface for certifiers. A link to this page is included in those views, and in the certification request email, for an easier reading experience.

##### Shared components:
- `LegalDisclaimerText`

<a id="page-404"></a>

### 'Page Not Found' page (_aka._ 404)

Shown when an invalid URL is visited. Links back to the homepage (which in turn for logged-in users, redirects back to their dashboard).

<a id="page-403"></a>

### 403 page (temporary; handles redirection after registration bug) `/403`

Temporary page to handle a specific issue with newly registered users sometimes not being automatically logged in after registration. This directs the user to click "Login" at the top of the page to complete their journey.

<a id="error-boundary"></a>

### Unknown Error page, _aka._ ErrorBoundary `(any URL)`

Displays an error message directing users to report the error on the [fider feedback site](https://ciip-feedback.pathfinder.gov.bc.ca/). Some error details are provided, which the user can copy into their bug report.

Unlike the other error pages which handle HTTP error status codes (network-level errors), this handles errors that may have originated on either client or server. It's not truly a page, but rather a component that may be displayed on any other page when an error that breaks the client-side code is triggered.

Note: An exception is that client-side errors on outdated browsers unsupported by React and Next will not trigger display of this view; those users will see a blank page instead.

### Static Text Pages nested within `/resources` folder:

<a id="website-disclaimer"></a>

####  BCGov-wide Website Disclaimer `/resources/disclaimer`

Boilerplate website disclaimer obtained from DevHub.

<a id="privacy"></a>

#### BCGov-wide Privacy Statement `/resources/privacy`

Boilerplate website privacy statement obtained from DevHub.

<a id="copyright"></a>

#### BCGov-wide Copyright Statement `/resources/copyright`

Boilerplate website copyright statement obtained from DevHub.

<a id="contact"></a>

#### Contact page `/resources/contact`

Provides basic contact information (CAS email address) for website and application support.

_______

<a id="query-parameters"></a>

## Note on required query parameters:
Asterisk\* denotes routes with required query parameters. Without certain parameters appended to the URL (providing some necessary data for the view) as key-value pairs, an error page will be shown. The expected parameters differ between pages, and multiple query parameters are separated by an `&` character. An example is the application page, which requires the following string to be appended to the end of the URL `/reporter/application`:

`?applicationId=someID&version=1&formResultId=anotherID`

In the next iteration of CIIP we aim for better compliance with REST conventions by replacing required query parameters with dynamic routes that employ route parameters instead, thus triggering a 404 when missing (as opposed to the current 500 error page).

<a id="global-components"></a>

## Globally shared components

- `DefaultLayout`
  * `Header`
  * `Subheader` (only on a subset of pages)
  * `Footer`
- `LoadingSpinner`
- `ToasterHelper`
- `ErrorBoundary`
- `PageRedirectHandler`
