import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';

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

    const processedContent = await remark()
        .use(html)
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