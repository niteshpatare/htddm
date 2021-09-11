import React from 'react'
import { graphql } from 'gatsby'
import Recaptcha from 'react-google-recaptcha'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import SVGIcon from '../components/SVGIcon'

const recaptchaRef = React.createRef();

// Export Template for use in CMS preview
export const DefaultPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  body
}) => (
  <main className="DefaultPage">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    <script src="https://www.google.com/recaptcha/api.js" ></script>
    <section className="section">
      <div className="container">
        <Content source={body} />
        <SVGIcon src="/images/calendar.svg" />
      </div>
    </section>
    <form action="?" method="POST" data-netlify="true" data-netlify-recaptcha="true">
    <Recaptcha ref={recaptchaRef} sitekey="6LfP01wcAAAAAJg6jgTdFFdl0DocIwYP8x_Jqrfb"  />
      <br/>
      <input type="submit" value="Test Recaptcha" />
    </form>

  </main>
)

const DefaultPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <DefaultPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default DefaultPage

export const pageQuery = graphql`
  query DefaultPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
  }
`
