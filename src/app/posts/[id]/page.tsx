// modules
import Link from "next/link";
import dynamic from "next/dynamic";

// components
import Date from '@/components/Date';
const Comment = dynamic(()=> import('@/components/Comment'), {
    ssr: false
});

// post
import { getAllPostIds, getPostData } from "@/lib/post";

// style
import postStyle from '@/styles/post.module.css';
import '@/styles/post.css';

export async function generateStaticParams(){
    const posts = getAllPostIds();
    
    return posts.map((post)=>({
        id: post.params.id
    }))
}

export default async function Post({params} : any){
    const postData = await getPostData(params.id);

    return (
        <>
            <article className='w-full'>
                <div className={postStyle.head}>
                    <h1 className={postStyle.title}>{postData.title}</h1>
                    <small className={postStyle.date} >
                        <Date dateString={postData.date}/>
                    </small>
                </div>
                <div className={postStyle.prose}>    
                    {postData.contentHtml? 
                        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
                        : <div>컨텐츠가 없습니다.</div>
                    }
                </div>
            </article>
            <Comment/>
            <div className='py-5'>
                <Link href='/posts'>← Back To List</Link>
            </div>

        </>
    )
}