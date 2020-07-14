import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useMutation } from '@apollo/react-hooks';
import 'react-quill/dist/quill.snow.css';
import '../components/addPost/addPost.scss';
import { useImperativeQuery } from '../utils/queryUtils';
import { useParams, useHistory } from 'react-router-dom';
import modifyPostQuery from '../graphql/modifyPost.graphql';
import getPostQuery from '../graphql/getPost.graphql';

// modify input title, content, tags
const ModifyPost = () => {
  let { id } = useParams();
  let history = useHistory();
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [inputTagValue, setInputTagValue] = useState('');
  const callQuery = useImperativeQuery(getPostQuery);
  const [ modifyPost ] = useMutation(modifyPostQuery);
  
  const modifyThis = async () => {
		const {data} = await modifyPost({ variables: { modifyPostInput: { id, content: value, title, tags } } });
		if (data) {
      history.push('/list');
      history.go();
		}
	};

  const fetchPost = async () => {
    const {data} = await callQuery({id});
    if (data) {
      const {content: oldContent, title: oldTitle, tags: oldTags} = data.getPost;
      setValue(oldContent);
      setTags(oldTags);
      setTitle(oldTitle); 
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);  

  const handleTagInput = (e) => {
    let tagVal = e.target.value;
    setInputTagValue(tagVal);
    if (tagVal.length > 1 && tagVal.endsWith(',')) {
      setTags(tags.concat(tagVal.slice(0, -1)));
      setInputTagValue('');
    }
  }

  const deleteTagHandler = (e) => {
    if(e.keyCode === 8 && inputTagValue.length === 0) {
      setTags(tags.slice(0, -1));
    }
  }

  const submitHandler = () => {
    addPost({variables:{
      inputPost: {
        title,
        tags,
        content: value,
        writer: "Jin"
      }
    }});
  }

  const titleHandler = (e) => {
    setTitle(e.target.value);
    console.log(title);
  }

	return (
		<div>
			<div className="editor-container">
        <input 
          className="title"
          type="text" 
          placeholder="제목:" 
          value={title} 
          onChange={titleHandler}
        />
        <div>
          {
            tags.map((tag, idx) => <span key={idx} className="written-tag">{tag}</span>)
          }
          <input 
            className="tags" 
            type="text" 
            placeholder="태그를 입력해주세요"
            onChange={handleTagInput}
            value={inputTagValue}
            onKeyDown={deleteTagHandler}
          />
        </div>
        <ReactQuill
          placeholder="공부한 것을 기록해 봅시다..!"
          theme="snow" 
          value={value} 
          onChange={setValue} 
        />
        <button 
          className="button__addPost"
          onClick={modifyThis}
        >
          수정하기
        </button>
			</div>
		</div>
	);
};

export default ModifyPost;
