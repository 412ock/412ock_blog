// modules
import Link from 'next/link';

// components
import Date from '@/components/Date';

// request Post
import { getSortedPostData } from '@/lib/post';

// styles
import postStyle from '@/styles/post.module.css';

export default function PostList() {
    const allPostsData = getSortedPostData();
    return (
        <ul className={postStyle.postList}>
            {allPostsData.map(({id, date, title}: any) => {
                return(
                    <li className={postStyle.postItem} key={id}>
                        <Link className={postStyle.title} href={`/posts/${id}`}>{title}</Link>
                        <small className={`${postStyle.date}`}>
                            <Date dateString={date} />
                        </small>
                    </li>
                )
            })}
        </ul>
    )
}