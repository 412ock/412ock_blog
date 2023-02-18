// modules
import Link from "next/link";

// components
import Date from '@/components/Date';

// post
import { getAllPostIds, getPostData } from "@/lib/post";

// style
import postStyle from '@/styles/post.module.css';

export async function getStaticPaths(){
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    }
}

export default async function Post({params} : any){
    const postData = await getPostData(params.id);

    console.log(postData.contentHtml);

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
            <div className='py-5'>
                <Link href='/posts'>← Back To List</Link>
            </div>
        </>
    )
}