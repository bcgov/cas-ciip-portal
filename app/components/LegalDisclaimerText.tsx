import React from 'react';
import getConfig from 'next/config';

const LegalDisclaimerText: React.FunctionComponent = () => {
  const adminEmail = getConfig()?.publicRuntimeConfig.ADMIN_EMAIL;
  return (
    <>
      <p>In this application:</p>
      <ol id="glossary">
        <li>
          (a) &quot;CIIP&quot; means the{' '}
          <a
            href="https://www2.gov.bc.ca/gov/content?id=6F748A4DD83447C59B8B9361882FF9A3"
            target="_blank"
            rel="noopener noreferrer"
          >
            CleanBC Industrial Incentive Program;
          </a>
        </li>
        <li>
          (b) &quot;GGIRCA&quot; means{' '}
          <em>Greenhouse Gas Industrial Reporting and Control Act</em>;
        </li>
        <li>
          (c) &quot;Operator&quot; means the person identified as responsible
          for the Reporting Operation;
        </li>
        <li>
          (d) &quot;Province&quot; means Her Majesty the Queen in Right of
          British Columbia;
        </li>
        <li>
          (e) &quot;Reporting Operation&quot; means the industrial operation
          identified in the application;
        </li>
        <li>
          (f) &quot;Representative&quot; means the individual completing this
          application on behalf of the Operator.
        </li>
      </ol>
      <p>
        By submitting this application, the Representative agrees as follows:
      </p>
      <ol id="consents">
        <li>
          The Representative warrants and represents that the Representative has
          the authority to, on behalf of the Operator, provide the following
          consents and confirmations.
        </li>
        <li>
          The Representative confirms that they have reviewed the information
          being submitted, and have exercised due diligence to ensure that the
          information is true and complete, and that, to the best of the
          Representative&apos;s knowledge, the information submitted herein is
          accurate and based on reasonable estimates using available data.
        </li>
        <li>
          The Operator consents to the release, by government employees
          responsible for administering GGIRCA, to employees, contractors and
          agencies of the Province responsible for administering the CleanBC
          Program for Industry of information contained in emission reports made
          under GGIRCA and submitted in relation to the Reporting Operation, for
          the purposes of administering the CleanBC Program for Industry. This
          consent is specific to emission reports made in respect of the three
          reporting periods prior to the submission of this application and will
          remain in effect for one year.
        </li>
        <li>
          The Operator consents to the release, by government employees
          responsible for administering CleanBC Program for Industry, to
          employees responsible for administering GGIRCA, of information
          contained in this application, for the purposes of administering
          GGIRCA. This consent is specific to this application and will remain
          in effect for one year.
        </li>
        <li>
          All information for which consent has been granted will be subject to
          government policies, directives and standards relating to the
          confidentiality of information.
        </li>
        <li>
          The Operator may at any time withdraw its consent under paragraphs{' '}
          <strong>c</strong> or <strong>d</strong> by submitting a withdrawal of
          consent in a form specified by the director appointed under GGIRCA.
          Forms may be obtained by submitting an email request to{' '}
          <a
            href={`mailto:${adminEmail}?subject=CIIP: Request for consent withdrawal forms`}
          >
            {adminEmail}
          </a>
          .
        </li>
        <style jsx global>{`
          ol#glossary {
            list-style-type: none;
            padding-left: 0.5em;
          }
          ol#consents {
            list-style-type: lower-alpha;
          }
        `}</style>
      </ol>
    </>
  );
};

export default LegalDisclaimerText;
