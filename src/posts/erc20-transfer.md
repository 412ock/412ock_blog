---
title: '나의 ERC20을 컨트랙트가 옮기는 방법은 없다.'
date: '2023-02-19'
---
![solidity image](https://412ock-blog-image.s3.ap-northeast-2.amazonaws.com/ethereum_velog.jpg
)

# ERC20 전송 문제

이더리움 상에서 ERC20 토큰이 전송이 되기 위해서는 주인이 트랜잭션을 발생시켜야 한다는 원칙이 있다. 당연히 소유 토큰을 타인이 이전을 한다는 것은 이상하지 않는가.
하지만 이번에 내가 진행했던 CDS 금융 파생상품 만들기 프로젝트는 컨트랙트가 누군가의 자산의 이전을 컨트랙트 차원에서 진행할 필요가 있었다.
그러자면 다음과 같은 순서로 트랜잭션이 이뤄져야했다.

1. ERC20의 특정 갯수만큼의 사용권한을 컨트랙트에 부여한다.(approve) 
2. 컨트랙트가 해당 ERC20 토큰 갯수를 타 유저에게 전해주고 지불완료 체크를 한다(transferFrom).

다들 알다시피, 이더리움의 트랜잭션 처리 속도는 10~15초 정도로 상당히 걸리는 편이다. 제공하는 서비스에서 CDS 상품 하나를 생성하는데 최대 30초씩이나 화면에서 보내야 한다. 이미지 하나 띄우는 1~2초도 최적화하고 있는데 무슨 수를 써서라도 시간을 줄이고 싶었다.

특히 이번 문제는 잘 하면 풀 수 있을 것 같은 문제라는 것이었다. 여러가지 아이디어가 있었어서 하나하나 검증해봐야했다.

# 방법 1. 내 주소로 Call 요청을 한다.
___
내 주소로 콜 요청을 해서 인자 값에 ERC20 Payload를 넣어서 보내보려고 했다.
하지만 내 주소로 콜 요청을 한다는 발상부터가 잘못되었었다.
`address.call` 라는 것이 결국 상대 컨트랙트의 함수를 호출하거나 EOA에 이더리움을 전송할 때 사용하는 것이다. ERC20 payload를 넣어서 호출한다는 것은 즉 내 주소로 발행된 컨트랙트에 ERC20 함수를 호출하겠다는 것인데, 내 주소는 EOA이다. 컨트랙트가 아니라는 것이다. 아마 해당 메소드를 실행시키면 분명 트랜잭션이 revert 되었을 것이다.

# 방법 2. presigned transaction 을 이용한다.
___

ERC20 컨트랙트에 보내는 토큰 양도 트랜잭션을 먼저 서명하고, 새로운 컨트랙트에서 해당 트랜잭션을 실행시키는 방법을 생각해봤다.

이더리움은 트랜잭션을 모아 블록이 생성되는 것을 기준으로 하는 상태머신이다. 그러니 컨트랙트 함수 호출 자체는 하나의 트랜잭션으로 실행된다고 할지라도, 그 시점에서 바뀐 상태값을 갖고 올 수 있을 수가 없다고 생각한다. 컨트랙트에 양도된 토큰의 갯수를 확인할 수 있어야 컨트랙트가 토큰을 이전할 수 있는데 해당 함수 실행 동안에 바뀐 상태값을 인지할 수 있냐는 것이다.

그리고 하나는 솔리디티 언어 차원에서 rawTransaction을 실행시켜주는 기능이 제공되고 있는지도 확인해볼 필요가 있다.

# 방법 3. Delegate Call 을 이용한다.
___

사실 이 부분은 의견을 듣자마자 안 될 것이라 생각이 들었다. Delegate Call은 다른 컨트랙트에서 정의하고 있는 함수 로직은 그대로 쓰면서 실행은 호출한 컨트랙트에서 진행하는 기능이다. 하지만 직접 토큰의 갯수가 저장되고 있는 ERC20 컨트랙트의 데이터를 바꿔야하지, 현재 실행되고 있는 컨트랙트의 데이터가 바뀌어봤자 변하는 것은 아무것도 없다. 토큰에 대한 정보는 ERC20 컨트랙트가 갖고 있기 때문이다.

# 결국 기술적으로 불가능하다는 결론

이번 프로젝트에서 겪었던 문제를 풀었다고 생각했던 오픈소스 프로젝트들의 깃헙 리파지터리도 확인을 했다. OpenSea, UniSwap 에서 사용하는 프로토콜들이었다. 하지만 결국 모든 코드에서 ERC20 컨트랙트의 transferFrom을 실행시키고 있는 것은 확인했지만, apporve 를 실행시키는 코드는 확인하지 못했다.

더 조사를 해보다가 OpenZeppelin에서 논의 된 글을 읽게 되었다. 위의 소개된 방법도 몇 가지 언급되고 있다. 이 문제는 결국 `ERC20` 토큰을 타 컨트랙트가 대리해서 양도하기 위해서는 트랜잭션이 두 개로 나뉠 수 밖에 없다는 결론을 내게 되었다.


# 참고
- [OpenZeppelin Forum: Approve and transferFrom in the same tx](https://forum.openzeppelin.com/t/approve-and-transferfrom-in-the-same-tx/700
)