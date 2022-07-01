import { Redirect, Route, Switch } from 'react-router-dom'
import React from 'react'
import AllQuote from './Pages/AllQuote'
import QuoteDetail from './Pages/QuoteDetail'
import NewQuote from './Pages/NewQuote'
import Layout from './components/layout/Layout'
import NotFound from './Pages/NotFound'

const App = () => {
  return (
    <>
     <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuote />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
     </Layout>
    </>
  )
}

export default App