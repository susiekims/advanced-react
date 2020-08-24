import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import Link from "next/link";

import { perPage } from "../config";
import PaginatiionStyles from "./styles/PaginationStyles";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = (props) => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;

      const count = data.itemsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const { page } = props;
      return (
        <PaginatiionStyles>
          <Head>
            <title>
              Sick Fits! Page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: page - 1 },
            }}
          >
            <a aria-disabled={page <= 1}>⬅ Prev</a>
          </Link>
          <p>
            Page {page} of {pages}
          </p>
          <p>{count} items total</p>
          <Link
            prefetch
            href={{
              pathname: "items",
              query: { page: page + 1 },
            }}
          >
            <a aria-disabled={page >= pages}>Next ➡</a>
          </Link>
        </PaginatiionStyles>
      );
    }}
  </Query>
);

export default Pagination;
