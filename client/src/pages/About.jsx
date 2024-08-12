import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div> 
          <h1 className='text-4xl font-semibold text-center mb-7'>About Rahul's Blog</h1>
          <div className='text-gray-500 text-md flex flex-col gap-6'>
          <p>
              Welcome to Rahul's Blog! This blog was created by Rahul Koju
              as a personal project to create a Content Management System "(CMS)".
              Rahul is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p>
              On this blog, you'll find articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Rahul is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
