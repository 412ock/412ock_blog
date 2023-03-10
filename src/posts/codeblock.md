---
title: 'Remark 코드블럭 테스트'
date: '2023-02-23'
---

```js
const fruit1 = 'apple';
const fruit2 = 'banana';

const objFruits = {
    fruit1,
    fruit2,
}
```

```c
#include <stdio.h>

int main(void) {
    printf("Hello, World!");

    return 0;
}
```

# 문제

이 블로그에서는 아마 앞으로도 코드블럭을 다루는 일이 많을 것이다. 개발 글들을 모아놓고 있기 때문에, 코드의 사례로 풀어내는 것이 이해에 도움이 될 것이라 생각하기 때문이다.

현재 문제는 제공하고자 하는 기능들이 CSS적으로 충돌이 일어나는 것 같다. 바로 Tailwind와 remark 부분에서다.

이전까지는 remark 오픈소스를 이용하여 마크다운으로 작성되어 있는 포스트를 웹에서 제공하고 있다. 그리고 마크다운의 Task-List와 CodeBlock 기능을 내 블로그에서도 제공하기 위해서 remark 오픈소스 생태계에서 제공하고 있는 기능이 있는지 확인했다.
Task-List 같은 경우는 `remark-gfm`을 이용하여 손쉽게 작업할 수 있었다. 하지만 이때도 원래 List와 CheckBox 가 동시에 렌더링 되는 문제가 생겨서 CSS 적으로 해결을 해주었다.

하지만 이번에는 CodeBlock의 Syntax Highligh 부분이 문제다. 언어마다, 그리고 언어의 특징마다 색상을 더해주는 작업이 자동화되어야 하는데 Tailwind와 Remark가 충돌이 일어나면서 손수 CSS 작업을 해줘야하는 상황이 생겨버렸다. 절대로 그런 노가다 작업은 내 손으로 안 하려고 한다.

현재 이 문제를 풀기 위해서 해결책을 찾고 있다.
위의 JavaScript 코드블럭이 아름답게 색칠이 되면 이 문제가 해결된 것이라고 생각하면 된다.

# 해결

코드블럭에 어떻든 hljs가 클래스 명으로 넣어지는 것을 확인했다.
hljs를 확인해보니 유명한 코드 하이라이트 라이브러리인 hightlight.js 에서 파생된게 틀림없었다.
이를 tailwind에서 분명 plugin으로 지원해줄 것이라 생각했다.
당연히 사용가능했고, 위 문제를 해결해 줄 수 있었다.

- 한데, tailwindcss.config에 들어간 safelist가 궁금해진다.

> If you need to make sure Tailwind generates certain class names that don’t exist in your content files, use the safelist option
