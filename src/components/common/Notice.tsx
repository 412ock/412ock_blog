// styles
import noticeStyle from '@/styles/common/notice.module.css';

export default function Notice(
    {children}
    : {children : React.ReactNode}
) {
    return (
        <div className={noticeStyle.notice}>
            {children}
        </div>
    )
}