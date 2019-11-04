import {commitMutation, graphql} from 'react-relay';

const mutation = graphql`
  mutation createProductMutation($input: CreateProductInput!) {
    createProduct(input: $input) {
      product {
        rowId
      }
    }
  }
`;

export default function createProduct(environment, row) {
  const optimisticResponse = {
    createProduct: {
      product: row
    }
  };

  commitMutation(environment, {
    mutation: saveMutation,
    variables: saveVariables,
    onCompleted: async (response, errors) => {
      console.log(response);
      const currentBenchmark = this.getCurrentBenchmark();
      const benchmarkPatch = {
        productId: response.createProduct.product.rowId
      };
      await this.editProduct();
      if (currentBenchmark) {
        await this.editBenchmark(currentBenchmark.rowId, benchmarkPatch);
      }

      window.location.reload();
    },
    onError: err => console.error(err)
  });
}
