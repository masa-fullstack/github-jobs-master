import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'
import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles'

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ja">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument

CustomDocument.getInitialProps = async (ctx: DocumentContext) => {
  const styledComponentSheets = new StyledComponentSheets()
  const materialUiServerStyleSheets = new MaterialUiServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          styledComponentSheets.collectStyles(
            materialUiServerStyleSheets.collect(<App {...props} />)
          ),
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {styledComponentSheets.getStyleElement()}
          {materialUiServerStyleSheets.getStyleElement()}
        </>
      ),
    }
  } finally {
    styledComponentSheets.seal()
  }
}
