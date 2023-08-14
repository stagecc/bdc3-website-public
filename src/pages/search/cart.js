import React from 'react'
import { PageContent } from '../../components/layout'
import { Title } from '../../components/typography'
import { SEO } from '../../components/seo'
import { CartContents } from '../../components/search/cart'
import { Link } from '../../components/link'

const CartPage = () => {

  return (
    <PageContent width="95%" maxWidth="1200px" center gutters>
      <SEO
        title="My Cart - Sementic Search"
        description="My Cart - BioData Catalyst semantic search provided by Dug"
      />

      <Title>My Cart</Title>

      <Link to="/search">Back to search</Link>

      <CartContents />

    </PageContent>
  );
}

export default CartPage;
