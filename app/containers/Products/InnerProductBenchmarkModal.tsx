import React from 'react';
import {Button, Modal, Container} from 'react-bootstrap';
import {JSONSchema7} from 'json-schema';
import JsonSchemaForm from '@rjsf/core';
import FormArrayFieldTemplate from 'containers/Forms/FormArrayFieldTemplate';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import productSchema from './product-schema.json';
import HeaderWidget from 'components/HeaderWidget';
import PastBenchmarks from 'components/Benchmark/PastBenchmarks';
import {ProductRowItemContainer_product} from 'ProductRowItemContainer_product.graphql';

interface Benchmark {
  id: string;
  rowId: number;
  benchmark: string;
  eligibilityThreshold: string;
  incentiveMultiplier: string;
  startReportingYear: number;
  endReportingYear: number;
  minimumIncentiveRatio: string;
  maximumIncentiveRatio: string;
  createdAt: string;
}

interface PastBenchmark {
  node: Benchmark;
}

interface Props {
  updateStatus: (...args: any[]) => void;
  product: ProductRowItemContainer_product;
  benchmarkSchema: any;
  currentBenchmark: Benchmark;
  editProduct: (IChangeEvent) => void;
  editBenchmark: (IChangeEvent) => void;
  createBenchmark: (IChangeEvent) => void;
  pastBenchmarks: PastBenchmark[];
  isProduct: boolean;
}

// Conditionally renders the inside of the Edit/View Product/Benchmark modal based on the value of isProduct
export const ProductBenchmarkInnerModal: React.FunctionComponent<Props> = ({
  updateStatus,
  product,
  benchmarkSchema,
  currentBenchmark,
  editProduct,
  editBenchmark,
  createBenchmark,
  pastBenchmarks,
  isProduct
}) => {
  const modalButtons = () => {
    if (isProduct) {
      if (product.productState === 'DRAFT')
        return (
          <>
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Button
              variant="success"
              onClick={async () => updateStatus('PUBLISHED')}
            >
              Publish Product
            </Button>
          </>
        );

      if (product.productState === 'PUBLISHED' && !product.isReadOnly)
        return (
          <Button
            variant="warning"
            onClick={async () => updateStatus('ARCHIVED')}
          >
            Archive Product
          </Button>
        );
      return <Button className="hidden-button" />;
    }

    if (
      product.productState === 'DRAFT' ||
      product.productState === 'PUBLISHED'
    )
      return <Button type="submit">Save</Button>;

    return <Button className="hidden-button" />;
  };

  return (
    <>
      <Modal.Header closeButton style={{color: 'white', background: '#003366'}}>
        <Modal.Title id="product-benchmark-header">
          <h2>
            <span className="h4">
              {isProduct ? 'Edit Product' : 'Edit Benchmark'}
            </span>
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{background: '#f5f5f5'}}>
        <Container>
          <JsonSchemaForm
            omitExtraData
            liveOmit
            disabled={
              isProduct
                ? product.productState !== 'DRAFT' || product.isReadOnly
                : product.productState === 'ARCHIVED'
            }
            widgets={{header: HeaderWidget}}
            schema={
              isProduct
                ? (productSchema.schema as JSONSchema7)
                : (benchmarkSchema.schema as JSONSchema7)
            }
            uiSchema={
              isProduct ? productSchema.uiSchema : benchmarkSchema.uiSchema
            }
            formData={isProduct ? product : currentBenchmark}
            showErrorList={false}
            ArrayFieldTemplate={FormArrayFieldTemplate}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={
              isProduct
                ? editProduct
                : currentBenchmark && product.productState === 'DRAFT'
                ? editBenchmark
                : createBenchmark
            }
          >
            {modalButtons()}
          </JsonSchemaForm>
          {isProduct ? null : (
            <PastBenchmarks pastBenchmarks={pastBenchmarks} />
          )}
        </Container>
      </Modal.Body>
      <style jsx global>{`
        .hidden-title label {
          display: none;
        }
        .close {
          color: white;
        }
        .hidden-button {
          display: none;
        }
      `}</style>
    </>
  );
};

export default ProductBenchmarkInnerModal;
