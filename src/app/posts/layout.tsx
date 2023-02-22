import postStyle from '@/styles/post.module.css';

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <main className={postStyle.container}>
            {children}
        </main>
      </>
    )
}