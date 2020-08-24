import React, {useState, useCallback} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import Link from 'next/link';
import {useRouter} from 'next/router';
import createApplicationMutation from 'mutations/application/createApplicationMutation';
import {ApplyButtonContainer_applyButtonDetails} from 'ApplyButtonContainer_applyButtonDetails.graphql';
import {ApplyButtonContainer_query} from 'ApplyButtonContainer_query.graphql';
interface Props {
  relay: RelayProp;
  applyButtonDetails: ApplyButtonContainer_applyButtonDetails;
  query: ApplyButtonContainer_query;
}

export const ApplyButton: React.FunctionComponent<Props> = ({
  applyButtonDetails,
  query,
  relay
}) => {
  const {
    facilityByFacilityId,
    applicationRevisionStatus,
    applicationByApplicationId
  } = applyButtonDetails;
  const {hasSwrsReport, rowId} = facilityByFacilityId;
  const applicationId = applicationByApplicationId?.id;
  const [showMissingReportModal, setShowMissingReportModal] = useState(false);
  const [applyButtonClicked, setApplyButtonClicked] = useState(false);

  const router = useRouter();

  const canOpenApplication = useCallback(() => {
    if (query.openedReportingYear?.reportingYear) return true;

    // The application was not started yet
    if (!applicationId) return false;

    // The first version of the application was started but not submitted before the deadline
    if (
      applicationRevisionStatus === 'DRAFT' &&
      applicationByApplicationId?.latestDraftRevision.versionNumber <= 1
    )
      return false;

    return true;
  }, [
    applicationByApplicationId?.latestDraftRevision.versionNumber,
    applicationId,
    applicationRevisionStatus,
    query.openedReportingYear?.reportingYear
  ]);

  if (!canOpenApplication()) {
    return (
      <Button disabled variant="info">
        The application window is closed
      </Button>
    );
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

      router.push({
        pathname: '/reporter/new-application-disclaimer',
        query: {
          applicationId: response.createApplicationMutationChain.application.id,
          version: 1,
          hasSwrsReport
        }
      });
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
            We can&apos;t find a copy of your company&apos;s latest emissions
            report in our records.
          </p>
          <p>
            Please note that it may take approximately{' '}
            <strong>10 business days</strong> to import any emissions report
            data submitted through the Single Window Reporting System into your
            CleanBC Industrial Incentive Program (CIIP) application.
          </p>
          <p>
            You can either cancel your application now and return at least 10
            business days after you have submitted your emissions report, or
            proceed without an emission report.{' '}
            <strong>
              Please note that If you choose to proceed without importing data
              from your emissions report, then you will have to input some of
              the same data captured in the Single Window System.
            </strong>
          </p>
          <p>
            Submission of a CIIP application does not guarantee compliance under
            the <em>Greenhouse Gas Industrial Reporting and Control Act</em> or
            its regulations.
          </p>
          <p>
            For any questions, please{' '}
            <a href="mailto: ghgregulator@gov.bc.ca">contact</a> the Climate
            Action Secretariat at GHGRegulator@gov.bc.ca
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

  if (applicationRevisionStatus === 'DRAFT') {
    const continueApplication = () => {
      router.push({
        pathname: latestDraftlegalDisclaimerAccepted
          ? '/reporter/application'
          : '/reporter/new-application-disclaimer',
        query: {
          applicationId,
          version: latestDraftVersionNumber
        }
      });
    };

    return (
      <Button variant="primary" onClick={continueApplication}>
        Resume CIIP application
      </Button>
    );
  }

  if (
    applicationRevisionStatus === 'SUBMITTED' ||
    applicationRevisionStatus === 'REQUESTED_CHANGES' ||
    applicationRevisionStatus === 'REJECTED' ||
    applicationRevisionStatus === 'APPROVED'
  ) {
    return (
      <Link
        href={{
          pathname: '/reporter/view-application',
          query: {
            applicationId,
            version: latestSubmittedVersionNumber
          }
        }}
      >
        <Button variant="primary">View Submitted Application</Button>
      </Link>
    );
  }

  return null;
};

export default createFragmentContainer(ApplyButton, {
  applyButtonDetails: graphql`
    fragment ApplyButtonContainer_applyButtonDetails on FacilitySearchResult {
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
      applicationRevisionStatus
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
