---
title: '나의 ERC20을 컨트랙트가 옮기는 방법'
date: '2023-02-19'
---

# ERC20

이더리움 상에서 ERC20 토큰이 전송이 되기 위해서는 주인이 트랜잭션을 발생시켜야 한다는 원칙이 있다. 당연히 소유 토큰을 타인이 이전을 한다는 것은 이상하지 않는가.
하지만 이번에 내가 진행했던 CDS 금융 파생상품 만들기 프로젝트는 컨트랙트가 누군가의 자산을 이전을 컨트랙트에서 진행할 필요가 있었다.