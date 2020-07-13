import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import 'react-quill/dist/quill.snow.css';
import './AddPost.scss';
import { useHistory } from 'react-router';

const ADD_POST = gql`
  mutation CreatePost($inputPost: PostInput) {
    createPost(input: $inputPost) {
      id
    }
  }
`;

const AddPost = () => {
  let history = useHistory();
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [inputTagValue, setInputTagValue] = useState('');
  const [addPost, {data}] = useMutation(ADD_POST);

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

  const submitHandler = async () => {
    const {data} = await addPost({variables:{
      inputPost: {
        title,
        tags,
        content: value,
        writer: "Jin"
      }
    }});
    if (data) {
      history.push('/list');
      history.go();
    }
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
            placeholder="태그를 입력해주세요 ( , 를 누르시면 입력됩니다)"
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
          onClick={submitHandler}
        >
          작성하기
        </button>
			</div>
		</div>
	);
};

export default AddPost;
