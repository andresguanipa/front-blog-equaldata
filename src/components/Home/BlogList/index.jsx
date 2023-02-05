import React from 'react';
import BlogItem from './BlogItem';
import './styles.css';



const BlogList = ({ blogs }) => {

  return (

    <div className='blogList-wrap'>
      {blogs.map((blog, i) => (

        <BlogItem blog={blog} key={i} />

      ))}
    </div>

  );
};

export default BlogList;
