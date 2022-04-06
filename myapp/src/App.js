import './App.css';
import {useState} from 'react'
// React에서 사용자 정의 tag를 만들때는 반드시 대문자로 시작해야 함.
// 사용자 정의 태그 = Component 라고 함!
function Header(props){
  return <header>
  <h1>
    <a href='/' onClick={(event)=>{ // event가 동작되면 react는 callback함수의 첫번째 parameter에 event 객체를 전달해준다. 이 event 객체는 event 상황과 정보를 제어할 수 있는 여러가지 기능을 가지고 있다.
      event.preventDefault(); // a tag의 기본 동작(reload) 방지
      props.onChangeMode();
    }}>{ props.title }</a>
  </h1>
</header>
}

function Nav(props){
  const lis =[];
  for(let i =0 ; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
        <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{ // id 값에 {t.id}를 주고 나서 onChangeMode에 parameter 줄 때 이용. 주의 ) 숫자를 id값에 주면 문자열로 파싱되므로, 숫자로 변환해줘야함
          event.preventDefault();
          props.onChangeMode(Number(event.target.id));  //event.target은 event를 유발시킨 tag를 가리킨다 , 여기서는 a tag를 의미함. 
        }}>{t.title}</a>
      </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function Article(props){
  return <article>
  <h2>{props.title}</h2>
  {props.body}
</article>
}

//onSubmit -> form tag에서 submit을 클릭했을 때 발생하는 event!!
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={(event)=>{
      event.preventDefault(); //pagereload 막기
      const title = event.target.title.value; 
      const body = event.target.body.value;
      props.onCreate(title,body);
    }}> 
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <input type="submit" value="Create"></input>
    </form>
  </article>
}


// Object type 으로 , 객체 안의 title 값이 REACT 로 들어가게 됨.
function App() {
  // 내부에서 값 변화에 대응하기 위해서는 useState 사용.
  // const _mode =useState('WELCOME'); // userState의 인자는 그 state의 초기값.
  // const mode = _mode[0];
  // // useState = 배열을 return . 0번째 원소는 그 상태의 값을 읽을 때 사용, 1번째 원소는 상태의 값을 변경할 때 사용하는 함수 (규칙으로 정해져있음!)
  // const setMode = _mode[1];

  // 간단하게 표현 
  // mode, setMode 는 임의로 정한 이름
  // create 클릭 시 mode가 create로 변하고 create에 해당하는 ui가 나오게끔
  const [mode,setMode] = useState('WELCOME');
  const [id,setId] = useState(null);
  const [nextId,setNextId] = useState(4);
  const [topics,setTopics] = useState([
    {id:1,title:'html',body:'html is ...'},
    {id:2,title:'javascript',body:'javascript is ...'},
    {id:3,title:'css',body:'css is ...'}
  ]);

  let content = null;
  if(mode==='WELCOME'){
    content= <Article title="Welcome" body="Hello Web"/> 
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
  }
  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');
      }}/> 
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}/>    
      {content}
      <li>
      <a href='/create' onClick={(event)=>{
        event.preventDefault();
        setMode('CREATE');
      }}>Create</a></li>
      <li><a href='/update'>Update</a></li> 
      <li><a href='/delete'>Delete</a></li>
    </div>
  );
}
// <Header> <Nav> 와 같은 component 옆의 속성들을 모두 prop 이라고 함.
export default App;
