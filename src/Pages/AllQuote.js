import React,{useEffect} from 'react';
import useHttp from '../hooks/hooks/use-http';
import { getAllQuotes } from '../lib/lib/api';
import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const DUMMY_QUOTES = [
    
    {id: 'q1', author:'Samuel Beckett', text: 'Try Again. Fail again. Fail better'},
    {id: 'q2', author:'Helen Keller', text: 'We can do anything we want to if we stick to it long enough'},
    {id: 'q3', author:'Maxime Lagacé', text: 'Stay foolish to stay sane'}
];

const AllQuote = () => {

  const {sendRequest, status,data:loadedQuote, error} = useHttp(getAllQuotes,true);

  useEffect(() => {
    sendRequest();
  },[sendRequest]);

  if(status === 'pending'){
    return <div className='centered'>
      <LoadingSpinner />
    </div>
  }
  if(error){
    return <p className='centered focused'>{error}</p>
  }
  if(status === 'completed' && (!loadedQuote || loadedQuote.length=== 0)){
    return <NoQuotesFound />
  }

  return  <QuoteList quotes={loadedQuote}/>
}

export default AllQuote