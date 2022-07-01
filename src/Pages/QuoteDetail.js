import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import React,{useEffect} from "react";
import useHttp from "../hooks/hooks/use-http";
import { getSingleQuote } from "../lib/lib/api";
import Comments from "../components/comments/Comments";
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from "../components/UI/LoadingSpinner";


// const DUMMY_QUOTES = [
    
//     {id: 'q1', author:'Samuel Beckett', text: 'Try Again. Fail again. Fail better'},
//     {id: 'q2', author:'Helen Keller', text: 'We can do anything we want to if we stick to it long enough'},
//     {id: 'q3', author:'Maxime Lagacé', text: 'Stay foolish to stay sane'}
// ];

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const {quoteId} = params
  const {sendRequest,status, data:loadedQuote, error}=useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);

  },[sendRequest, quoteId]);

  if(status === 'pending'){
    return <div className="centered"> 
    <LoadingSpinner />
    </div>
  }
  if(error){
    return <p className="centered"> No Quote Found.</p>
  }

  // const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

  if(!loadedQuote){
    return <p>No Quote Found.</p>
  }

  return (
    <>
    <div>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
      <Route path={match.path} exact> 
      <div className="centered">
        <Link className='btn--flat' to={`${match.url}/comments`}>
          Load Comments
        </Link>
      </div>
      </Route>
      <Route path={`${match.path}/comments`}> 
        <Comments />
      </Route>
    </div>
    </>
  );
};

export default QuoteDetail;
