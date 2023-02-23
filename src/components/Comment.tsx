'use client'

import React from 'react';

const Comment : React.FC =  ()=>(
    <section className='w-full px-5'
        ref={(elem) => {
            if (!elem) {
                return;
            }

            const scriptElem = document.createElement('script');
            scriptElem.src = 'https://utteranc.es/client.js';
            scriptElem.async = true;
            scriptElem.setAttribute('repo', '412ock/412ock_blog');
            scriptElem.setAttribute('issue-term', 'title');            
            scriptElem.setAttribute('label', 'blog-comment');
            scriptElem.setAttribute('theme', 'github-light');
            scriptElem.setAttribute('crossorigin', 'anonymous');
            elem.appendChild(scriptElem);
        }}
    />
)

export default Comment