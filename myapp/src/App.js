import './App.css';
import {useState} from 'react'
import Header from './components/layout/Header';
import Article from './components/view/Article';
import Nav from './components/layout/Nav';
import Create from './components/crud/Create';
import Update from './components/crud/Update';


function App() {
  const [mode,setMode] = useState('WELCOME');
  const [id,setId] = useState(null);
  const [nextId,setNextId] = useState(4);
  const [topics,setTopics] = useState([
    {id:1,title:'MongoDB',body:'NoSQL ...'},
    {id:2,title:'NodeJS',body:'Version conflicts ...'},
    {id:3,title:'Docker',body:'Sick of it ...'}
  ]);

  let content = null;
  let contextControl = null; //read mode일때만 update 버튼이 나타나도록 지역변수 설정
  if(mode==='WELCOME'){
    content= <Article title="Welcome" body="Hello React!"/> 
    // 이후에 Article components에서 props로 받고 props.title  , props.body로 접근
  }else if(mode==='READ'){
    let title,body=null;
    for (let i =0; i<topics.length; i++){
      if(topics[i].id===id){
        console.log(topics[i].id, id);
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <>
    <li><a href={'/update/'+id} onClick={(event)=>{ //read 를 하면 id가 setting 되어 있을 것임..
      event.preventDefault();
      setMode('UPDATE'); // Update로 이동
    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics = [];
      for(let i=0; i<topics.length; i++){
        if(topics[i].id!==id){
          newTopics.push(topics[i]); 
        }
      }
      setTopics(newTopics);
      setMode('WELCOME');
    }}></input></li>
    </> 
  }else if(mode==='CREATE'){
    content =<Create onCreate={(title,body)=>{
      const newTopic = {id:nextId,title:title,body:body};
      // topics.push(newTopic);
      // setTopics(topics); // 이거랑 위 두 줄은 primitive일때 state 변경 방법
      // 객체 타입일때는 아래와 같이 state update
      const newTopics = [...topics]; //topics를 복제함
      newTopics.push(newTopic);
      setTopics(newTopics);
      // 새로운 topic 추가한 뒤 상세 페이지로 이동
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }else if (mode==='UPDATE'){
    let title,body=null; // 기존 값 얻어와야 하니까
    for (let i =0; i<topics.length; i++){
      if(topics[i].id===id){
        console.log(topics[i].id, id);
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content= <Update title={title} body={body} onUpdate={(title,body)=>{ // 기존 값 가지고 있어야 함 title={title} 이부분!
      //변경된 값을 topics에 update
      const updatedTopic = {id:id,title:title,body:body}
      // 배열 객체 타입이니까 복제 방식으로 수정
      const newTopics =[...topics];
      for(let i=0 ; i<newTopics.length; i++){
        if (newTopics[i].id===id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ'); // 상세 보기 페이지로 이동
      //여기서 id는 이미 세팅되어있으므로 필요없음.
    }}></Update>
  }
  return (
    <div>
      <Header title="React" onChangeMode={()=>{
        setMode('WELCOME');
      }}/> 
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}/>    
      {content}
      <ul>
        <li>
        <a href='/create' onClick={(event)=>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a></li>
        {contextControl} 
      </ul>  
    </div>
  );
}
export default App;
