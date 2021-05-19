import React, {useState, useMemo} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import Link from 'next/link';
import {useRouter} from 'next/router';
import getConfig from 'next/config';
import createApplicationMutation from 'mutations/application/createApplicationMutation';
import {ApplyButtonContainer_applyButtonDetails} from 'ApplyButtonContainer_applyButtonDetails.graphql';
import {ApplyButtonContainer_query} from 'ApplyButtonContainer_query.graphql';
import {
  getApplicationDisclaimerPageRoute,
  getApplicationPageRoute,
  getViewApplicationPageRoute
} from 'routes';
interface Props {
  reportingYear: number;
  relay: RelayProp;
  applyButtonDetails: ApplyButtonContainer_applyButtonDetails;
  query: ApplyButtonContainer_query;
}

export const ApplyButton: React.FunctionComponent<Props> = ({
  applyButtonDetails,
  query,
  relay,
  reportingYear
}) => {
  const {
    facilityByFacilityId,
    applicationStatus,
    applicationByApplicationId
  } = applyButtonDetails;
  const {hasSwrsReport, rowId} = facilityByFacilityId;
  const applicationId = applicationByApplicationId?.id;
  const [showMissingReportModal, setShowMissingReportModal] = useState(false);
  const [applyButtonClicked, setApplyButtonClicked] = useState(false);

  const adminEmail = getConfig()?.publicRuntimeConfig.ADMIN_EMAIL;
  const adminMailToUrl = adminEmail ? `mailto:${adminEmail}` : '#';

  const router = useRouter();

  const canOpenApplication = useMemo(() => {
    if (query.openedReportingYear?.reportingYear === reportingYear) return true;

    // The application was not started yet
    if (!applicationId) return false;

    // The first version of the application was started but not submitted before the deadline
    if (
      applicationStatus === 'DRAFT' &&
      applicationByApplicationId?.latestDraftRevision?.versionNumber <= 1
    )
      return false;

    return true;
  }, [
    applicationByApplicationId?.latestDraftRevision?.versionNumber,
    applicationId,
    applicationStatus,
    query.openedReportingYear?.reportingYear
  ]);

  if (!canOpenApplication) {
    return <div style={{minWidth: '9.7em'}} />;
  }

  if (!applicationId) {
    const startApplication = async () => {
      setApplyButtonClicked(true);
      const {environment} = relay;
      const variables = {
        input: {
          facilityIdInput: rowId
        }
      };

      const response = await createApplicationMutation(environment, variables);

      router.push(
        getApplicationDisclaimerPageRoute(
          response.createApplicationMutationChain.application.id,
          1,
          hasSwrsReport
        )
      );
    };

    const missingReportModal = (
      <Modal
        show={showMissingReportModal}
        onHide={() => setShowMissingReportModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Attention: Missing Emissions Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            We can&apos;t find an emissions report for{' '}
            {query.openedReportingYear.reportingYear} for this facility in our
            records.
          </p>
          <p>
            It may take approximately <strong>10 business days</strong> from the
            time you submitted the emissions report to the Single Window
            Reporting System (SWRS) for the data to be imported into the CIIP
            application system.
          </p>
          <p>
            You may cancel your application now and try again later. If you
            choose to proceed without the imported SWRS data, you will need to
            manually enter the applicable data as it was reported in SWRS. You
            may also see warnings regarding the entered information not matching
            the SWRS report.
          </p>
          <p>
            Note, submission of a CIIP application does not constitute meeting
            reporting obligations as required under the{' '}
            <a href="https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/14029_01">
              <em>Greenhouse Gas Industrial Reporting and Control Act</em>
            </a>{' '}
            or its regulations.
          </p>
          <p>
            For any questions, please <a href={adminMailToUrl}>contact</a> the
            Climate Action Secretariat at {adminEmail}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            disabled={applyButtonClicked}
            onClick={startApplication}
          >
            Begin Application Anyway
          </Button>
          <Button
            variant="secondary"
            onClick={() => setShowMissingReportModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );

    const checkForSwrsReport = () => {
      if (hasSwrsReport) startApplication();
      else {
        setShowMissingReportModal(true);
      }
    };

    return (
      <>
        {missingReportModal}
        <Button
          variant="primary"
          disabled={applyButtonClicked}
          onClick={checkForSwrsReport}
        >
          Apply for CIIP for this facility
        </Button>
      </>
    );
  }

  const {
    latestDraftRevision,
    latestSubmittedRevision
  } = applicationByApplicationId;

  const latestSubmittedVersionNumber = latestSubmittedRevision?.versionNumber;
  const latestDraftVersionNumber = latestDraftRevision?.versionNumber;
  const latestDraftlegalDisclaimerAccepted =
    latestDraftRevision?.legalDisclaimerAccepted;

  if (applicationStatus === 'DRAFT') {
    return (
      <Link
        passHref
        href={
          latestDraftlegalDisclaimerAccepted
            ? getApplicationPageRoute(applicationId)
            : getApplicationDisclaimerPageRoute(
                applicationId,
                latestDraftVersionNumber,
                hasSwrsReport
              )
        }
      >
        <Button variant="primary">Resume CIIP application</Button>
      </Link>
    );
  }

  if (
    applicationStatus === 'SUBMITTED' ||
    applicationStatus === 'REQUESTED_CHANGES' ||
    applicationStatus === 'REJECTED' ||
    applicationStatus === 'APPROVED'
  ) {
    return (
      <Link
        passHref
        href={getViewApplicationPageRoute(
          applicationId,
          latestSubmittedVersionNumber
        )}
      >
        <Button variant="primary">View Submitted Application</Button>
      </Link>
    );
  }

  return null;
};

export default createFragmentContainer(ApplyButton, {
  applyButtonDetails: graphql`
    fragment ApplyButtonContainer_applyButtonDetails on FacilityApplication {
      applicationByApplicationId {
        id
        latestDraftRevision {
          id
          versionNumber
          legalDisclaimerAccepted
        }
        latestSubmittedRevision {
          id
          versionNumber
        }
      }
      applicationStatus
      facilityByFacilityId {
        rowId
        hasSwrsReport
      }
    }
  `,
  query: graphql`
    fragment ApplyButtonContainer_query on Query {
      openedReportingYear {
        reportingYear
      }
    }
  `
});
