import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Unified Ecosystem
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remark2rehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';


const postsDirectory = path.join(process.cwd(), 'src', 'posts');

export function getSortedPostData()  {
    
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName: string) => {
        const id = fileName.replace(/\.md$/, '');

        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const {data: {title, date}}  = matter(fileContents);

        return {
            id,
            title,
            date
        };
    });

    return allPostsData.sort((a, b)=>{
        if(a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map((fileName: string) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const {data: {title, date}, content: content} = matter(fileContents);

    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remark2rehype)
        .use(rehypeStringify)
        .use(rehypeHighlight)
        .process(content);
    
    

    const contentHtml = processedContent.toString();

    return {
        id,
        title,
        date,
        content,
        contentHtml,
    }
}