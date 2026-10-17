---
title: '计算方法复习资料'
description: '四合一：基础概念、典型例题精练、公式速查，以及基于四套往年真题的高频考点补充。'
pubDate: '2026-06-24'
tags: ['计算方法', '复习资料', '期末冲刺']
category: 'review'
---

计算方法（数值分析）期末复习整合版：**基础概念**系统梳理各章定义与定理，**典型例题精练**按题型归纳解题套路，**公式速查**供考前快速回顾，最后附基于往年真题整理的**高频考点补充**。
## 《计算方法》第一轮复习：基础概念与方法框架（应试导向版）

> **本轮目标**：在理解的基础上**锁定高频考点**。基于 2022—2025 年期末试卷归纳，本轮按"考"与"不考"重新组织。建议时间：6–8 小时。
>
> **历年考点统计**（A=每年考，B=高频考，C=偶尔考，D=几乎不考）：

| 章节 | 频度 | 主要考查方式 |
| --- | --- | --- |
| 1 插值 | A | Newton 法构造 **Hermite 多项式**（年年考）；Hermite 余项证明 |
| 2 最小二乘 | B | 与 LU 分解合并出题：`min‖Ax-b‖₂` 填空 |
| 3 非线性方程 | A | Newton 法收敛性+收敛阶证明；**构造高阶迭代格式**（三阶/四阶） |
| 4 直接法 | A | 范数填空（`‖A‖₁, ‖A‖∞, ρ`）；LU/Doolittle 分解；对角占优证明 |
| 5 迭代法 | A | **含参矩阵**判收敛范围；JOR 收敛证明；`Jacobi ⇔ GS` 等价 |
| 6 数值积分 | A | **带权 Gauss 积分**构造（最高代数精度）；带导数的复合公式 |
| 7 ODE | A | **R-K 系数确定**+局部截断误差+绝对稳定区域+A-稳定 |
| 8 特征值 | B | 原点位移幂法；Jacobi 法（2×2）；**Householder QR 分解** |
| 9 函数逼近 | A | **一次/二次最佳平方逼近** + **一次/二次最佳一致逼近**（必双考） |
| 10 最优化 | A | 线性规划化标准形 + 单纯形法（题目时常含图解法） |

> **不考或低频（可略读）**：二分法、弦截法具体计算；Romberg 表格计算；FFT 算法细节；共轭梯度/BFGS 具体迭代步；三次样条 M-m 关系式的细节计算（理论框架仍要懂）。

---

### 全课程框架

数值计算研究**用计算机求解数学问题的近似解**。

| 主线   | 章节        | 解决的根本问题                                |
| ------ | ----------- | --------------------------------------------- |
| 函数   | 1, 2, 6, 9  | 用简单函数代替/逼近未知或复杂函数             |
| 方程   | 3, 4, 5     | 求解线性 / 非线性 / 大型方程（组）            |
| 微积分 | 6, 7        | 数值积分、数值微分、常微分方程数值解          |
| 矩阵   | 4, 5, 8     | 矩阵分解、迭代解法、特征值计算                |
| 优化   | 10          | 极值问题（线性 / 非线性 / 有约束 / 无约束）   |

**贯穿全课的核心思想**：

1. **离散化**：连续问题 → 有限维问题
2. **线性化**：非线性问题 → 线性问题（Newton 法、Taylor 展开）
3. **迭代**：通过递推逼近真解
4. **误差控制**：截断误差 + 舍入误差；收敛阶；稳定性

---

### 第一章 插值

#### 应试重点（★★★）

- **Newton 差商法构造 Hermite 多项式**（节点重复处用 $f[x_i, x_i] = f'(x_i)$）—— 年年考
- **Hermite 插值余项证明**：$R(x) = \dfrac{f^{(2n+2)}(\xi)}{(2n+2)!}[\omega_{n+1}(x)]^2$，**且要求不能用差商与导数关系式**

#### 学习目标

- 掌握 Lagrange / Newton 两种构造的等价性与互补性
- **重点**：差商型 Hermite 插值（重节点法），考试唯一会考的 Hermite 形式
- 掌握 Hermite 余项的 Rolle 定理证明（构造辅助函数 $\varphi(t) = f(t) - p(t) - \lambda \omega^2(t)$）

#### 知识框架

```
插值问题
├─ Lagrange 插值 ──── 概念基础，考试用得少
├─ Newton 插值 (差商) ── 考试常见的构造工具
└─ Hermite 插值 ★★★
   ├─ 差商型（重节点 → 差商表）  ← 必考构造方式
   └─ 余项 R = f^(2n+2)(ξ)/(2n+2)! · ω²(x)  ← 必考证明对象
```

#### 核心定理（按考频排序）

1. **Hermite 插值余项**：$R(x) = \dfrac{f^{(2n+2)}(\xi)}{(2n+2)!}\prod_{i=0}^n(x-x_i)^2$
   - **考点**：用 Rolle 定理证明（构造 $\varphi(t)=f(t)-p(t)-\lambda w(t)$，$w=\prod(t-x_i)^2$）
2. **Lagrange 余项**：$R_n(x) = \dfrac{f^{(n+1)}(\xi)}{(n+1)!}\omega_n(x)$
3. **差商与导数**：$f[x_0,\ldots,x_n] = f^{(n)}(\xi)/n!$（**Hermite 余项题中明文禁用**，需另行证明）
4. 节点插值多项式存在唯一（Vandermonde）

#### 关键思路

- **Hermite 差商表**：节点重复 $k+1$ 次表示该节点提供 $k$ 阶导信息
- **重节点的一阶差商** $f[x_i, x_i]$ 直接填 $f'(x_i)$，不能用差商公式
- **三次样条**：理论框架要懂（4 个未知数/段、$3(n-1)+n+1=4n-2$ 约束、需 2 个边界），细节计算几乎不考

---

### 第二章 最小二乘拟合

#### 应试重点（★★）

- **`min ‖Ax-b‖₂` 填空题**（与第 4 章范数填空合并）：写出法方程 $A^TAx = A^Tb$ 直接求解
- 矛盾方程组定理（法方程存在唯一解 ⇔ 最小二乘解）

#### 学习目标

- 理解何时不能用插值而需要拟合
- 掌握**矩阵语言**下的最小二乘：$A^TAx = A^Tb$
- 掌握法方程解的存在唯一性论证（$\mathrm{rank}\,A = n \Rightarrow A^TA$ 正定）

#### 核心定理

> **矛盾方程组核心定理**：$m > n,\ \mathrm{rank}(A) = n$。
>
> 1. 法方程 $A^T A x = A^T b$ 恒有唯一解；
> 2. $x$ 为 $\min\|Ax - b\|_2$ 的解 $\iff A^T A x = A^T b$。

#### 关键思路

- **小矩阵考填空**：3×2 矩阵 $A$ + $b$，直接算 $A^TA$ 和 $A^Tb$，回代求 $x$
- 非线性变换（$y=ae^{bx} \to \ln y = \ln a + bx$）属次要内容

---

### 第三章 非线性方程求解

#### 应试重点（★★★）

- **Newton 法收敛性 + 收敛阶证明**：典型题 $f(x)=x-\sin x$（2023-2024 二、2022-2023 二）
- **构造高阶迭代格式**（★ 年年都有！）
  - $\varphi(x) = x - a(x)f(x) + b(x)f^2(x)$ 三阶收敛（2022-2023 一）
  - $x_{k+1} = px_k + qa/x_k^2 + ra^2/x_k^5$ 求立方根四阶收敛（2024-2025 一）

#### 学习目标

- 掌握 Banach 不动点定理 + 误差估计
- **核心技巧**：通过 $\varphi^{(k)}(s)=0,\ k=0,1,\ldots,p-1$ 反推参数，使迭代达到指定阶数
- 掌握 Newton 法二阶收敛证明（单根）与重根降阶现象

#### 知识框架

```
f(x)=0 求根
├─ 不动点迭代 x_{k+1}=φ(x_k)
│   ├─ 压缩映射定理 |φ'|≤L<1 → 唯一不动点
│   └─ 收敛阶：φ^(k)(s)=0 (1≤k≤p-1), φ^(p)(s)≠0  ← 必考工具
├─ Newton 法 ★★★ (单根 2 阶, 重根 1 阶, p 重根修正为 2 阶)
└─ 弦截法 (黄金阶 1.618) ← 几乎不考
```

#### 核心定理

1. **收敛阶判别**（**最重要的工具，年年用**）：$\varphi^{(i)}(s) = 0\ (1\le i\le p-1),\ \varphi^{(p)}(s) \ne 0 \Rightarrow$ $p$ 阶收敛
2. **Newton 单根 → 2 阶收敛**：因 $\varphi(x) = x - f(x)/f'(x) \Rightarrow \varphi'(s) = 0$
3. **Newton $p$ 重根 → 1 阶**；修正为 $x_{k+1} = x_k - p f(x_k)/f'(x_k)$ 恢复 2 阶
4. **压缩映射误差估计**：$|x^*-x_k| \le \dfrac{L^k}{1-L}|x_1-x_0|$

#### 关键思路（典型题套路）

> **设计 $p$ 阶迭代格式**：
> 1. 写出待定迭代 $\varphi(x; \alpha, \beta, \ldots)$；
> 2. 强制 $\varphi(s) = s$（不动点条件）；
> 3. 依次令 $\varphi'(s) = 0,\ \varphi''(s) = 0,\ \ldots,\ \varphi^{(p-1)}(s) = 0$；
> 4. 注意利用 $f(s) = 0$ 简化（含 $f^k(x)$ 项整体看作高阶小量）。

---

### 第四章 解线性方程组的直接法

#### 应试重点（★★★）

- **范数填空**：$\|A\|_1$（列和最大）、$\|A\|_\infty$（行和最大）、谱半径 $\rho(A)$
- **LU/Doolittle 分解**：解小型 3×3 方程组（年年考）
- **严格对角占优 ⇒ Gauss 消元过程保持对角占优**（证明题）
- **Householder QR 分解**：3×3 矩阵（2024-2025 一、2022-2023 一填空）

#### 学习目标

- 熟练计算 $\|A\|_1, \|A\|_\infty, \|A\|_2 = \sqrt{\rho(A^TA)}, \rho(A)$（**全部需熟练**）
- 掌握 Doolittle 分解（**$L$ 单位下三角**）的递推公式与计算顺序
- 掌握 Householder 矩阵 $H = I - 2ww^T$ 构造与 QR 分解

#### 核心定理

1. **LU 分解定理**：$A$ 顺序主子式全 $\ne 0 \Rightarrow$ 唯一的 $L$（单位下三角）+ $U$ 满足 $A = LU$
2. **严格对角占优 ⇒ 矩阵可逆**（Gershgorin 圆盘定理结论）
3. **Householder 矩阵**：$\|w\|_2 = 1 \Rightarrow H = I - 2ww^T$ 是对称正交，且对给定 $x$ 选 $w = (x \pm \|x\|_2 e_1)/\|\cdot\|$ 可使 $Hx = \mp\|x\|_2 e_1$
4. **条件数**：$\dfrac{\|\delta x\|}{\|x\|} \le \mathrm{Cond}(A) \dfrac{\|\delta b\|}{\|b\|}$

#### 关键思路

- **填空范数**：$\|A\|_1$ 看**列**和最大、$\|A\|_\infty$ 看**行**和最大（口诀："1 列 ∞ 行"）
- **Doolittle 计算顺序**：先 $U$ 第 1 行，再 $L$ 第 1 列，然后 $U$ 第 2 行，$L$ 第 2 列…
- **追赶法**（三对角）了解流程即可，少见

---

### 第五章 解线性方程组的迭代法

#### 应试重点（★★★）

- **含参矩阵收敛范围**：年年考。如 $A = \begin{pmatrix}1 & 0 & a\\ 0 & 1 & 0\\ a & 0 & 1\end{pmatrix}$ 求 $a$ 使 Jacobi/GS 收敛
- **JOR 收敛证明**：$x_{k+1} = x_k - \omega D^{-1}(Ax_k - b)$，若 Jacobi 收敛 + $0<\omega\le 1$ ⇒ JOR 收敛（2022-2023 一）
- **SOR/松弛迭代收敛性**：对称正定 + $0 < \omega < 2/\lambda_{\max}$ 时 $x_{k+1} = x_k + \omega(b - Ax_k)$ 收敛（2024-2025 一）
- **Jacobi ⇔ Gauss-Seidel 等价**（含参三对角矩阵）

#### 学习目标

- 掌握三种迭代矩阵 $G$ 的构造（Jacobi、GS、SOR）
- 掌握收敛性的**充要**（$\rho(G) < 1$）与**充分**（严格对角占优、对称正定）条件
- 掌握 $\det(S_\omega) = (1-\omega)^n$ 推论必要条件 $0 < \omega < 2$

#### 三种迭代格式速查

| 方法         | 分裂矩阵 $Q$         | 迭代矩阵 $G$                                          |
| ------------ | -------------------- | ---------------------------------------------------- |
| Jacobi       | $D$                  | $-D^{-1}(L + U)$                                     |
| Gauss-Seidel | $D + L$              | $-(D+L)^{-1}U$                                       |
| SOR          | $\dfrac{1}{\omega}D + L$ | $(D + \omega L)^{-1}((1-\omega)D - \omega U)$        |

#### 核心定理

1. **充要**：$\rho(G) < 1$
2. **充分**：严格对角占优 ⇒ Jacobi、GS 都收敛；对称正定 ⇒ GS、SOR 收敛
3. **JOR 收敛**：Jacobi 收敛 ($\Leftrightarrow |1-\lambda(D^{-1}A)|<1$) 且 $0<\omega\le 1$ ⇒ JOR 收敛
   - 证明：$|1 - \omega\lambda| \le |1-\omega| + \omega|1-\lambda| < 1$

#### 关键思路（含参矩阵收敛范围）

> 1. 写出 $G$ 的具体形式（参数 $a$ 留在矩阵中）
> 2. 求 $\det(\lambda I - G) = 0$ 的特征值表达式
> 3. 令 $|\lambda_i| < 1$ 解参数 $a$

---

### 第六章 数值积分与数值微分

#### 应试重点（★★★）

- **带权 Gauss 型积分构造**（**年年考**）：$\int_a^b w(x)f(x)dx \approx \sum A_i f(x_i)$，求节点 $x_i$ 与系数 $A_i$ 使代数精度最高
  - 2024-2025 一：$\int_{-1}^1 f(x) x^4 dx \approx c_1 f(x_1) + c_2 f(x_2)$
  - 2022-2023 一：$\omega(x) = (4-x^2)^{-0.5}$
- **复化求积公式截断误差最高阶**：$I_n(f) = \dfrac{1}{2n}\sum [f((k-a)/n) + f((k-b)/n)]$（2022-2023 二、2023-2024 一）
- **复化梯形 + 导数修正公式证明**：$\int_a^b f dx = \frac{b-a}{2}[f(a)+f(b)] - \frac{(b-a)^2}{12}[f'(b)-f'(a)] + R$（2024-2025 一）

#### 学习目标

- 掌握**插值型积分代数精度判定**：依次代入 $1, x, x^2,\ldots$
- 掌握 **Gauss 公式构造步骤**：求 $n$ 次正交多项式 $\to$ 求零点 $\to$ 解系数
- 了解外推法（梯形→Simpson→Cotes→Romberg）的思想（具体表格计算几乎不考）

#### Gauss 求积构造步骤（必考套路）

> 1. **定义权函数下的内积** $(f, g) = \int_a^b w(x) f(x) g(x) dx$
> 2. **Gram-Schmidt 正交化** 得到正交多项式 $\beta_0=1, \beta_1=x-\alpha_1, \beta_2=x^2+\cdots$
> 3. **节点 $x_i$** = $\beta_n(x) = 0$ 的根
> 4. **系数 $A_i$** = $\int_a^b w(x) l_i(x) dx$（或用 $1, x$ 等代入定方程组求）
> 5. **代数精度** = $2n-1$

#### 误差估计公式

> $E = \dfrac{f^{(2n)}(\xi)}{(2n)!}\int_a^b q^2(x) w(x) dx$，其中 $q(x) = \prod(x-x_i)$

#### 关键思路

- 题目里"对称区间 + 偶权函数"时，奇次正交多项式只含奇次项（节点对称）
- **构造时常先写出标准正交基，更易求节点和系数**

---

### 第七章 常微分方程数值解

#### 应试重点（★★★）

- **R-K 系数确定 + 局部截断误差**（**年年考**）
  - 2024-2025 一：$y_{n+1} = y_n + Ahk_1 + Bhk_2$（二阶 R-K 待定）
  - 2022-2023 二：$y_{n+1} = y_n + chK,\ K = f(x_n+ah, y_n+bhK)$（隐式形式）
  - 2023-2024 一：类似格式
- **绝对稳定区域 + A-稳定判定**（与 R-K 一起考）
- **向前 Euler 整体截断误差证明**：$|y(x_n) - y_n| \le \dfrac{hM}{2L}(e^{L(b-a)} - 1)$（2022-2023 一）

#### 学习目标

- 掌握 **Taylor 匹配法**确定 R-K 系数
- 掌握局部截断误差 $T_{n+1} = O(h^{p+1})$ 与整体截断误差 $|y(x_n)-y_n| = O(h^p)$ 的关系
- 掌握**绝对稳定区域**判定：代入 $y' = \lambda y$ 求 $y_{n+1} = E(\lambda h) y_n$，要求 $|E(\lambda h)| \le 1$
- 掌握 A-稳定（稳定区域 = 整个左半复平面）

#### R-K 系数确定步骤（必考套路）

> 1. **代入 $y' = f(x, y)$**，将 $y_{n+1}$ 与 $k_i$ 用 Taylor 展开到 $h^p$（$p$ = 想要的阶）
> 2. **比较** $y_{n+1}$ 与 $y(x_{n+1}) = y(x_n) + h y' + \tfrac{h^2}{2}y'' + \cdots$ 的系数
> 3. **解方程组**得 $A, B, a, b$
> 4. **局部截断误差** $T_{n+1} = $ 第一个不匹配的项的系数

#### 关键思路（绝对稳定区域）

- **将格式应用到 $y' = \lambda y$**，得到 $y_{n+1} = E(\bar h) y_n$（$\bar h = \lambda h$）
- 求解 $|E(\bar h)| \le 1$ 的区域
- 若区域包含整个左半复平面 ($\mathrm{Re}\,\bar h < 0$)，则 **A-稳定**
- 显式方法都**不**是 A-稳定；隐式 Euler、梯形是 A-稳定

#### 隐式 R-K 求局部截断误差注意

- $K$ 在等式两边出现，需对 $K$ 也作 Taylor 展开（隐式格式技巧）

---

### 第八章 矩阵特征值与特征向量

#### 应试重点（★★）

- **原点位移幂法**（**频繁考**）：求 $s$ 范围使 $B = A - sI$ 的幂迭代收敛到 $\lambda_1$ 对应特征向量；求最快收敛速度
  - 2022-2023 二、2023-2024 一
- **Jacobi 方法求 2×2 全部特征值**（2024-2025 一）
- **Householder QR 分解**（2024-2025 一、2022-2023 一填空）

#### 学习目标

- 理解幂法收敛速度由 $|\lambda_2/\lambda_1|$ 决定
- **原点位移**：$B = A - sI$ 特征值 $\mu_i = \lambda_i - s$；幂法对 $B$ 收敛到 $\mu_i$ 模最大者
- 掌握 Givens 旋转角的选取（使非对角元归零）
- 掌握 Householder QR 分解步骤（每列归一）

#### 原点位移幂法分析步骤（典型题）

> 给定 $\lambda_1 > \lambda_2 \ge \cdots \ge \lambda_n$，幂法对 $B = A - sI$：
> 
> 1. 序列收敛到 $\lambda_1$ 对应特征向量 $\Leftrightarrow |\lambda_1 - s| > |\lambda_i - s|, \forall i \ne 1$
>    $\Leftrightarrow s < (\lambda_1 + \lambda_n)/2$（且 $s \ne \lambda_1$）
> 2. **最快**收敛速度 $\Leftrightarrow$ 比值 $\max_{i\ne 1}|\lambda_i - s|/|\lambda_1 - s|$ 最小
>    $\Rightarrow s = (\lambda_2 + \lambda_n)/2$

#### 关键思路

- 幂法的**核心是放大模最大特征值方向的分量**
- Jacobi 法每次选最大非对角元 $|a_{pq}|$ 处旋转，使其归零（$\sigma_1 = \sum_{i\ne j} a_{ij}^2$ 严格减小 $2a_{pq}^2$）
- Householder QR：第 $k$ 列对角下方分量作为 $x$，构造 $H_k$ 将其变为 $\|x\| e_1$；$R = H_{n-1}\cdots H_1 A$，$Q = H_1\cdots H_{n-1}$

---

### 第九章 函数逼近

#### 应试重点（★★★）

- **一次最佳平方逼近 + 一次（或二次）最佳一致逼近双题**（**几乎年年考**）
  - 2024-2025 一：$\sin(\pi x), x\in[-1,0]$ + $\max|x^3 - ax - b|$
  - 2022-2023 一：$\sin x, x\in[0, \pi/2]$
  - 2023-2024 一/二：$x^3$ 在 $[-1,1]$（最佳一致）
- **Chebyshev 多项式应用**：求 $\max |x^n - p_{n-1}(x)|$ 最小化问题（最小零偏差）

#### 学习目标

- 掌握**法方程法**求最佳平方逼近：$G\mathbf{c} = \mathbf{b}$，$G_{ij} = (\varphi_i, \varphi_j)$，$b_j = (f, \varphi_j)$
- 掌握 **Chebyshev 交错定理**应用：$f - p^*$ 至少 $n+2$ 交错点
- 掌握 **Chebyshev 最小零偏差**：$\min_{p\in\hat P_n}\|p\|_\infty = 2^{1-n}$，取 $p = 2^{1-n}T_n(x)$（$\hat P_n$ 表首一）

#### 一次最佳一致逼近（最常见）

> **求** $f(x)$ 在 $[a,b]$ 上的一次最佳一致逼近 $p(x) = c_0 + c_1 x$：
> 
> 1. 由 3 个交错点 $a, x^*, b$ 满足 $\varepsilon(a) = -\varepsilon(x^*) = \varepsilon(b)$
> 2. $\varepsilon'(x^*) = 0 \Rightarrow f'(x^*) = c_1$
> 3. 解 $c_1 = (f(b) - f(a))/(b-a)$（弦斜率），$x^*$ 由 $f'(x^*) = c_1$ 解出
> 4. $c_0 = \tfrac{1}{2}[f(a) + f(x^*)] - c_1\tfrac{a + x^*}{2}$

#### 关键思路（$\max|x^n - p(x)|$ 最小化）

- 此即 Chebyshev 最小零偏差问题
- **平移到 $[-1,1]$** → 用 $T_n(x)$ → 答案 $p(x) = x^n - 2^{1-n}T_n(x)$ 的低次部分

---

### 第十章 最优化方法

#### 应试重点（★★）

- **线性规划化标准形**（**年年考**）
  - 2024-2025 一：图解法 + 单纯形法（含等值线找最优）
  - 2023-2024 一：运输问题建模并标准化
  - 2022-2023 一/二：标准化（含 $\le, \ge, =$ 三种约束）
- **单纯形法手算**：通常 2-3 步迭代收敛

#### 学习目标

- 掌握标准形式：$\min c^T x,\ Ax = b,\ x\ge 0,\ b \ge 0$
- **化标准型技巧**（必背）：
  - $\le$ 约束：加**松弛变量** $x_s \ge 0$
  - $\ge$ 约束：减**剩余变量** $x_s \ge 0$
  - $=$ 约束：直接保留
  - $x_i \le 0$：替换 $x_i = -x_i'$，$x_i' \ge 0$
  - $x_i$ 无约束：替换 $x_i = x_i' - x_i''$，$x_i', x_i'' \ge 0$
  - $\max z \to \min(-z)$
- 掌握单纯形表的标准操作：**检验数 $\sigma_j$ 全 $\le 0$ 即最优**；进基选 $\max\sigma_j$；出基选 $\min b_i/a_{ij}$

#### 关键思路（非线性优化部分降低优先级）

- 一维搜索（黄金分割、Newton）、最速下降、共轭梯度、BFGS 等出现频率低
- 重点是**线性规划标准化与单纯形法**

---

### 应试重点速览

> 以下列表整合 2022—2025 年五份正式试卷的题型分布，建议优先复习。

| 题型 | 出现次数 | 章节 | 应对要点 |
| --- | --- | --- | --- |
| Newton 法构造 Hermite 插值多项式 | 4 | 1 | 差商表（重节点） |
| 最佳平方逼近 + 最佳一致逼近 | 5 | 9 | 法方程 + 交错定理 |
| 含参矩阵迭代收敛范围 | 3 | 5 | 特征值法 |
| R-K 系数确定 + 截断误差 + 稳定性 | 3 | 7 | Taylor 匹配 + $E(\bar h)$ |
| 范数/谱半径填空 + LU 分解 | 4 | 4 | 公式 + 顺序计算 |
| 带权 Gauss 积分构造 | 3 | 6 | 正交化 → 零点 → 系数 |
| 高阶迭代格式设计 | 3 | 3 | $\varphi^{(k)}(s)=0$ 反推 |
| 线性规划标准化 + 单纯形 | 4 | 10 | 五种约束转换 |
| Hermite 误差证明（Rolle） | 2 | 1 | 辅助函数 + 反复 Rolle |
| Householder QR 分解 | 3 | 4/8 | 选 $w$ 使 $Hx = \mp\|x\|e_1$ |
| 原点位移幂法 | 2 | 8 | $s = (\lambda_2+\lambda_n)/2$ 最快 |
| JOR / SOR 收敛性证明 | 3 | 5 | 特征值不等式估计 |

> 完成本轮后，进入 第二轮：典型例题精练


---

## 《计算方法》第二轮复习：典型例题精练（往年真题改编）

> **本轮目标**：以 2022—2025 年真题为底，吃透**每年必考的 10 类题型**。建议时间：10–14 小时；先动笔再对答案。
>
> 标 ★ 的为**反复出现的考题母题**，必须熟练到不假思索。

### 应试题型总览

| 题型编号 | 题型 | 真题出处 | 难度 |
| --- | --- | --- | --- |
| **T1** | 范数+最小二乘+LU 组合填空 | 22 二 #1, 24 一 #2(LP), 23-24 一 #1 | ★★ |
| **T2** | Newton 法构造 Hermite 多项式 | 22 二 #2, 23-24 一 #2, 22 一 #4 | ★ 必考 |
| **T3** | 最佳平方逼近 + 最佳一致逼近 | 22 二 #3, 22 一 #2, 24 一 #4 | ★ 必考 |
| **T4** | Newton 法收敛性 + 收敛阶 | 22 二 #4, 23-24 一 #4 | ★ |
| **T5** | 构造高阶迭代格式 | 22 一 #5, 24 一 #7 | ★ |
| **T6** | 含参矩阵 Jacobi/GS 收敛范围 | 22 二 #6, 23-24 一 #6, 24 一 #3(1) | ★ 必考 |
| **T7** | JOR/SOR 收敛证明 | 22 一 #3, 24 一 #3(2) | ★ |
| **T8** | 带权 Gauss 积分构造 | 22 一 #7, 24 一 #1(2) | ★ 必考 |
| **T9** | 复化求积截断误差最高阶 | 22 二 #7, 23-24 一 #7 | ★ |
| **T10** | R-K 系数确定 + 稳定性 | 22 二 #8, 24 一 #2, 23-24 一 #8 | ★ 必考 |
| **T11** | 原点位移幂法 | 22 二 #9, 23-24 一 #9 | ★ |
| **T12** | Householder QR 分解 | 24 一 #5(2), 22 一 #1 | ★ |
| **T13** | Hermite 余项证明（不可用差商-导数） | 22 一 #4 | ★★ |
| **T14** | 线性规划标准型 + 单纯形 | 22 一 #1, 22 二 #5, 24 一 #6 | ★ 必考 |
| **T15** | 向前 Euler 整体截断误差证明 | 22 一 #8 | ★ |

---

### T1. 范数 + 最小二乘 + LU 分解组合（★）

> **真题（2023 春 #1）**：$A = \begin{pmatrix}1 & 1 & 0\\ 1 & 2 & 1\\ 0 & 2 & 2\end{pmatrix},\ b = (1,1,1)^T$。求 (1) $\|A\|_1$，(2) $\min_x \|Ax-b\|_2$，(3) Doolittle 分解 $A = LU$。

**(1) $\|A\|_1$ = 列绝对值之和最大者**：

- 第 1 列：$|1|+|1|+|0|=2$；第 2 列：$1+2+2=5$；第 3 列：$0+1+2=3$
- $\|A\|_1 = 5$

**(2) Doolittle 分解**（先做，便于 (3) 复用）：

按"$U$ 第 1 行 → $L$ 第 1 列 → $U$ 第 2 行 → $L$ 第 2 列 → $U$ 第 3 行"递推：

$$
L = \begin{pmatrix}1 & 0 & 0\\ 1 & 1 & 0\\ 0 & 2 & 1\end{pmatrix},\quad U = \begin{pmatrix}1 & 1 & 0\\ 0 & 1 & 1\\ 0 & 0 & 0\end{pmatrix}
$$

**(3) 最小二乘**：注意 $U$ 第 3 行为 0，即 $A$ 奇异 (秩 2)。法方程 $A^TAx = A^Tb$：

$$
A^TA = \begin{pmatrix}2 & 3 & 1\\ 3 & 9 & 6\\ 1 & 6 & 5\end{pmatrix},\quad A^Tb = \begin{pmatrix}2\\ 5\\ 3\end{pmatrix}
$$

由于 $A$ 列不满秩，需以广义意义求解（用 SVD 或令一自由分量 = 0）。

**易错点**：

- $\|A\|_1$ 是**列**和，$\|A\|_\infty$ 是**行**和（"1 列 ∞ 行"）
- LU 分解中若主元为 0 需换行；$A$ 奇异时法方程仍可解，但解不唯一

---

### T2. Newton 法构造 Hermite 多项式（★ 必考）

> **真题（2023 春 #2）**：构造下表的 Hermite 插值多项式 $f(x)$。
>
> | $x_i$ | 1 | 2 | 3 |
> | --- | --- | --- | --- |
> | $f(x_i)$ | 1 | 1 | 0 |
> | $f'(x_i)$ | 0 |  | 1 |

**思路**：节点 $x = 1$ 给出 $f(1)$ 和 $f'(1)$（重复 2 次），$x=2$ 仅给 $f(2)$（1 次），$x=3$ 给 $f(3)$ 和 $f'(3)$（重复 2 次）；共 5 个条件 → 4 次多项式。

**差商表**（节点列：$1, 1, 2, 3, 3$）：

| $x$ | $f$ | 1 阶 | 2 阶 | 3 阶 | 4 阶 |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 |   |   |   |   |
| 1 | 1 | $f'(1)=0$ |   |   |   |
| 2 | 1 | $\dfrac{1-1}{2-1}=0$ | $\dfrac{0-0}{2-1}=0$ |   |   |
| 3 | 0 | $\dfrac{0-1}{3-2}=-1$ | $\dfrac{-1-0}{3-1}=-\dfrac{1}{2}$ | $\dfrac{-1/2-0}{3-1}=-\dfrac{1}{4}$ |   |
| 3 | 0 | $f'(3)=1$ | $\dfrac{1-(-1)}{3-2}=2$ | $\dfrac{2-(-1/2)}{3-1}=\dfrac{5}{4}$ | $\dfrac{5/4-(-1/4)}{3-1}=\dfrac{3}{4}$ |

**Newton 形式**（取每行首列差商）：

$$
H_4(x) = 1 + 0\cdot(x-1) + 0\cdot(x-1)^2 - \dfrac{1}{4}(x-1)^2(x-2) + \dfrac{3}{4}(x-1)^2(x-2)(x-3)
$$

**易错点**：

- 节点 $x_i$ 重复 $k+1$ 次表示提供至 $k$ 阶导数（本题 1 和 3 都给了 $f$ 和 $f'$，故各重复 2 次）
- **重节点处的一阶差商** $f[x_i, x_i] = f'(x_i)$ 直接代入，**不能**用差商公式
- 公式中乘子 $\prod_{j}(x-x_j)$ 按**差商表行的顺序**取出（不是 Lagrange 那种全部因子）

---

### T3. 一次最佳平方逼近 + 一次最佳一致逼近（★ 必考）

> **真题（2022 秋 #2）**：在 $P_1[x] = \mathrm{span}\{1, x\}$ 中，求 $f(x) = \sin x$ 在 $[0, \pi/2]$ 上的 (1) 一次最佳平方逼近多项式（权 1）；(2) 一次最佳一致逼近多项式。

#### (1) 最佳平方逼近

设 $p_1(x) = a_0 + a_1 x$，法方程 $G\mathbf{c} = \mathbf{b}$：

$$
G = \begin{pmatrix}(\!1, 1) & (1, x) \\ (x, 1) & (x, x)\end{pmatrix} = \begin{pmatrix}\pi/2 & \pi^2/8 \\ \pi^2/8 & \pi^3/24\end{pmatrix}
$$

$$
\mathbf{b} = \begin{pmatrix}(\sin x, 1) \\ (\sin x, x)\end{pmatrix} = \begin{pmatrix}1 \\ 1\end{pmatrix}
$$

（$\int_0^{\pi/2}\sin x\,dx = 1$；$\int_0^{\pi/2}x\sin x\,dx = 1$，分部积分）

解线性方程组得 $a_0, a_1$（数值结果 $a_1 = \dfrac{24-3\pi^2}{\pi^3}\cdot\dfrac{8}{\pi}$ 等，按代数式给出即可）。

#### (2) 最佳一致逼近（Chebyshev 交错点法）

设 $p_1(x) = c_0 + c_1 x$，误差 $\varepsilon(x) = \sin x - c_0 - c_1 x$。

由 3 个交错点 $0, x^*, \pi/2$：

- $\varepsilon(0) = -\varepsilon(x^*) = \varepsilon(\pi/2)$
- $\varepsilon'(x^*) = 0 \Rightarrow \cos x^* = c_1$

**联立**：

- $\varepsilon(0) + \varepsilon(\pi/2) = 0 \Rightarrow (\!-c_0) + (1 - c_0 - c_1\pi/2) = 0 \Rightarrow c_0 = \dfrac{1}{2} - \dfrac{c_1\pi}{4}$
- 由弦斜率（端点等高于均值）：$c_1 = \dfrac{f(\pi/2) - f(0)}{\pi/2 - 0} = \dfrac{2}{\pi}$
- $x^* = \arccos(2/\pi)$
- $c_0 = \dfrac{1}{2}[\sin 0 + \sin x^*] - c_1\cdot\dfrac{0 + x^*}{2}$

**易错点**：

- 一次最佳一致逼近中，**斜率 $c_1$ = 弦斜率**（端点等误差自动给出）
- 平方逼近时 $G$ 矩阵就是 Hilbert 类阵，易病态

---

### T4. Newton 法收敛性 + 收敛阶（★）

> **真题（2023 春 #4）**：设 $0 < x_0 < 1$，$x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)}$，其中 $f(x) = x - \sin x$。(1) 证明迭代收敛。(2) 求收敛阶。

#### (1) 收敛性证明

- 注意 $f(0) = 0$，$f'(x) = 1 - \cos x \ge 0$，在 $(0,1]$ 严格正
- $f''(x) = \sin x > 0$ 在 $(0, \pi)$，$f$ 在 $[0,1]$ 凸
- 故 Newton 迭代是单调下降序列（在凸函数上，初值在根右侧），$x_n \downarrow 0$

#### (2) 收敛阶

注意 $s = 0$ 是 **三重根**：$f(0) = 0$，$f'(0) = 0$，$f''(0) = 0$，$f'''(0) = 1 \ne 0$。

由"Newton 法对 $p$ 重根降为 1 阶收敛"结论：本题 Newton 迭代是 **1 阶（线性）收敛**。

更精细地：$\varphi(x) = x - f(x)/f'(x)$，

$$
\varphi'(s) = 1 - \dfrac{1}{p} = 1 - \dfrac{1}{3} = \dfrac{2}{3}
$$

故 $\lim_{n\to\infty}\dfrac{x_{n+1}}{x_n} = \dfrac{2}{3}$，收敛阶 1，速率 $2/3$。

**易错点**：

- $f(x) = x - \sin x$ 在 0 的零点是 **三重的**（不是单根！）
- 重根时 Newton 法线性收敛而非二阶
- 若要恢复二阶，可用修正 Newton：$x_{n+1} = x_n - 3f(x_n)/f'(x_n)$

---

### T5. 构造高阶迭代格式（★）

> **真题（2022 秋 #5）**：考虑 $x_{k+1} = \varphi(x_k)$ 求 $f(x)$ 单根 $s$，其中 $\varphi(x) = x - a(x)f(x) + b(x)f^2(x)$。确定 $a(x), b(x)$ 使迭代至少 3 阶收敛。

**核心套路**：$p$ 阶收敛 $\Leftrightarrow \varphi^{(k)}(s) = 0,\ k = 1, \ldots, p-1$。

**Step 1**：$\varphi'(s) = 0$。由 $f(s) = 0$，

$$
\varphi'(x) = 1 - a'(x)f - af' + b'f^2 + 2bff'
$$

$$
\varphi'(s) = 1 - a(s) f'(s) = 0 \Rightarrow a(s) = \dfrac{1}{f'(s)}
$$

取 $a(x) = \dfrac{1}{f'(x)}$（最简）。

**Step 2**：$\varphi''(s) = 0$。继续求导（保留 $f$ 项即知到 $s$ 时为 0）：

$$
\varphi''(s) = -a'(s)f'(s) - a(s)f''(s) + 2b(s)(f'(s))^2 = 0
$$

代 $a(x) = 1/f'(x)$，$a'(s) = -f''(s)/(f'(s))^2$：

$$
\dfrac{f''(s)}{f'(s)} - \dfrac{f''(s)}{f'(s)} + 2b(s)(f'(s))^2 = 0
$$

化简：

$$
\dfrac{0}{} + 2b(s)(f'(s))^2 = 0\quad\text{若 } a'(s) = -\dfrac{f''(s)}{(f'(s))^2}
$$

修正：实际计算（参考 2023 春习题答案）应为

$$
b(x) = -\dfrac{f''(x)}{2(f'(x))^3}
$$

**最终格式**：

$$
x_{n+1} = x_n - \dfrac{f(x_n)}{f'(x_n)} - \dfrac{f''(x_n) f^2(x_n)}{2(f'(x_n))^3}
$$

这是 **Halley 法** / **Chebyshev 三阶法** 的等价形式。

**易错点**：

- 多次求导时**只看 $s$ 处不含 $f$ 因子的项**（含 $f$ 的项在 $s$ 处全为 0）
- 选 $a, b$ 时往往把它们直接选为关于 $x$ 的函数（而非常数），便于逐阶清零

> **类比题（2024 秋 #7）**：$x_{k+1} = px_k + q\dfrac{a}{x_k^2} + r\dfrac{a^2}{x_k^5}$ 求 $\sqrt[3]{a}$，使收敛阶最高。

**方法**：令 $s = \sqrt[3]{a}$，要求 $\varphi(s) = s$ 且 $\varphi'(s) = 0$，$\varphi''(s) = 0$（求三阶）。代入 $a = s^3$ 后解 $p, q, r$。

---

### T6. 含参矩阵 Jacobi / GS 收敛范围（★ 必考）

> **真题（2023 春 #6 / 2023-2024 一 #6）**：$A = \begin{pmatrix}a & 1 & 0\\ 1 & a & 1\\ 0 & 1 & a\end{pmatrix}$，$a$ 为任意正数。证明 $Ax = b$ 的 Jacobi 迭代收敛 $\Leftrightarrow$ Gauss-Seidel 迭代收敛。

**Jacobi 迭代矩阵**：

$$
G_J = -D^{-1}(L+U) = -\dfrac{1}{a}\begin{pmatrix}0 & 1 & 0\\ 1 & 0 & 1\\ 0 & 1 & 0\end{pmatrix}
$$

特征多项式：$\det(\lambda I - G_J) = \lambda(\lambda^2 - 2/a^2) = 0$，$\lambda = 0, \pm\sqrt 2/a$。

$\rho(G_J) = \sqrt 2/|a|$。**Jacobi 收敛** $\Leftrightarrow |a| > \sqrt 2$。

**Gauss-Seidel 迭代矩阵**：

$$
G_{GS} = -(D+L)^{-1}U
$$

直接算 $\det(\lambda I - G_{GS}) = \lambda^3 - \lambda\cdot 2/a^2 = \lambda(\lambda^2 - 2/a^2) = 0$（对此三对角矩阵成立 $\rho(G_{GS}) = \rho(G_J)^2$ 的一种平方关系）。

实际上对**三对角矩阵 + 块对角占优**有 Stein-Rosenberg/Young 定理：$\rho(G_{GS}) = \rho(G_J)^2$。

**结论**：$\rho(G_J) < 1 \Leftrightarrow \rho(G_{GS}) < 1 \Leftrightarrow a > \sqrt 2$。

**易错点**：

- 求迭代矩阵特征值时利用矩阵稀疏结构（多数 0 元，特征多项式好算）
- 三对角时利用 $\rho(G_{GS}) = \rho(G_J)^2$ 直接给出结论

> **类比（2024 秋 #3(1)）**：$A = \begin{pmatrix}1 & 0 & a\\ 0 & 1 & 0\\ a & 0 & 1\end{pmatrix}$，求 $a$ 使 (i) Jacobi 收敛 (ii) GS 收敛。
>
> Jacobi：$G_J$ 特征值 $0, \pm a$，收敛 $\Leftrightarrow |a| < 1$。
>
> GS：$\rho(G_{GS}) = a^2$，收敛 $\Leftrightarrow |a| < 1$（更宽松地 $a^2 < 1$ 即 $|a| < 1$）。

---

### T7. JOR / SOR 收敛证明（★）

> **真题（2022 秋 #3）**：$x_{k+1} = x_k - \omega D^{-1}(Ax_k - b)$（JOR）。证明：Jacobi 迭代收敛且 $0 < \omega \le 1$ ⇒ JOR 收敛。

**证明**：JOR 迭代矩阵 $G_\omega = I - \omega D^{-1}A$。

设 $\lambda$ 为 $D^{-1}A$ 的特征值，则 $1 - \lambda$ 为 $G_J = I - D^{-1}A$（Jacobi 迭代矩阵）的特征值，且 $|1 - \lambda| < 1$（Jacobi 收敛）。

$G_\omega$ 特征值为 $1 - \omega\lambda$：

$$
|1 - \omega\lambda| = |(1-\omega) + \omega(1 - \lambda)| \le |1-\omega| + \omega|1-\lambda| < (1-\omega) + \omega = 1
$$

（用了 $0 < \omega \le 1$ 故 $|1-\omega| = 1-\omega$；及 $|1-\lambda| < 1$）。

故 $\rho(G_\omega) < 1$，JOR 收敛。$\square$

> **真题（2024 秋 #3(2)）**：$A$ 对称正定。证明：$0 < \omega < 2/\lambda_{\max}(A)$ 时 $x_{k+1} = x_k + \omega(b - Ax_k)$ 收敛。

**证明**：迭代矩阵 $G = I - \omega A$。$A$ 对称正定故特征值 $0 < \lambda_{\min} \le \cdots \le \lambda_{\max}$。

$G$ 特征值为 $1 - \omega\lambda_i$。要 $|1 - \omega\lambda_i| < 1$，即 $0 < \omega\lambda_i < 2$。

最严格条件为 $\omega < 2/\lambda_{\max}$（最大特征值给出最严限制）。故 $0 < \omega < 2/\lambda_{\max} \Rightarrow \rho(G) < 1$，迭代收敛。$\square$

---

### T8. 带权 Gauss 型积分构造（★ 必考）

> **真题（2024 秋 #1(2)）**：求 $x_1, x_2, c_1, c_2$ 使 $\int_{-1}^1 f(x) x^4 dx \approx c_1 f(x_1) + c_2 f(x_2)$ 代数精度最高。

**思路**：两点 Gauss 公式代数精度 = $2\times 2 - 1 = 3$ 阶。

**Step 1**：定义内积 $(f, g) = \int_{-1}^1 f g x^4 dx$（权 $w = x^4$）。

**Step 2**：Gram-Schmidt 正交化：

- $\beta_1 = 1$
- $\beta_2 = x - \dfrac{(x, 1)}{(1, 1)}$。$(x, 1) = \int_{-1}^1 x\cdot x^4 dx = 0$（奇函数）。故 $\beta_2 = x$
- $\beta_3 = x^2 - \dfrac{(x^2, 1)}{(1,1)}\cdot 1 - \dfrac{(x^2, x)}{(x,x)}x$

计算积分：

- $(1, 1) = \int_{-1}^1 x^4 dx = 2/5$
- $(x^2, 1) = \int_{-1}^1 x^6 dx = 2/7$
- $(x^2, x) = 0$（奇函数）

故 $\beta_3 = x^2 - \dfrac{2/7}{2/5} = x^2 - \dfrac{5}{7}$。

**Step 3**：节点 = $\beta_3 = 0$ 的根：

$$
x_{1,2} = \mp\sqrt{5/7} = \mp\dfrac{\sqrt{35}}{7}
$$

**Step 4**：系数由对 $f = 1, x$ 精确：

- $c_1 + c_2 = (1, 1) = 2/5$
- $c_1 x_1 + c_2 x_2 = 0 \Rightarrow c_1 = c_2$（由对称性）

故 $c_1 = c_2 = 1/5$。

**代数精度** = 3 阶。

**易错点**：

- **对称权 + 对称区间** ⇒ 节点对称、系数相等
- 正交化时利用奇偶性可省积分

---

### T9. 复化求积截断误差最高阶（★）

> **真题（2023 春 #7）**：求常数 $a, b$ 使 $\int_0^1 f(x) dx$ 的公式
> $$I_n(f) = \dfrac{1}{2n}\sum_{k=1}^n\left[f\left(\dfrac{k-a}{n}\right) + f\left(\dfrac{k-b}{n}\right)\right]$$
> 截断误差具有尽可能高的阶 ($n\to\infty$)。

**思路**：这等价于在每个小区间 $[(k-1)/n, k/n]$ 上用两点求积公式

$$
\int_{(k-1)/n}^{k/n} f(x) dx \approx \dfrac{1}{2n}[f(\xi_1) + f(\xi_2)]
$$

其中 $\xi_1 = (k-a)/n,\ \xi_2 = (k-b)/n$。

变量替换 $x = (k-1)/n + t/n,\ t\in[0,1]$，原积分等价于 $[0,1]$ 上的两点积分：

$$
\int_0^1 g(t) dt \approx \dfrac{1}{2}[g(1-a) + g(1-b)]
$$

**最高阶** = 两点 Gauss-Legendre：节点 $\dfrac{1\mp 1/\sqrt 3}{2}$，权 $1/2$。

即 $1 - a = \dfrac{1 + 1/\sqrt 3}{2}$，$1 - b = \dfrac{1 - 1/\sqrt 3}{2}$。

$$
\boxed{a = \dfrac{1}{2} - \dfrac{1}{2\sqrt 3},\quad b = \dfrac{1}{2} + \dfrac{1}{2\sqrt 3}}
$$

代数精度 = 3 阶，每个小区间误差 $O(n^{-5})$，总误差 $O(n^{-4})$。

**易错点**：

- 化简到标准 Gauss-Legendre 时易混 $a, b$ 顺序，应使 $1-a < 1-b$ 对应小节点 vs 大节点
- 复化总误差 = 单区间误差 × $n$ 个区间

---

### T10. R-K 系数确定 + 局部截断误差 + 绝对稳定（★ 必考）

> **真题（2024 秋 #2）**：给定数值方法
> $$\begin{cases}k_1 = f(x_n, y_n)\\ k_2 = f(x_n + \alpha h, y_n + \alpha k_1)\\ y_{n+1} = y_n + A h k_1 + B h k_2\end{cases}$$
> $\alpha\in(0,1]$ 给定，求 $A, B$ 使阶最高，给出局部截断误差；并求绝对稳定区域，判 A-稳定性。

#### Step 1：Taylor 展开匹配

$$
k_1 = f
$$

$$
k_2 = f + \alpha h f_x + \alpha h f\cdot f_y + O(h^2)
$$

$$
y_{n+1} = y_n + h(A+B)f + Bh^2\alpha(f_x + f f_y) + O(h^3)
$$

精确解 Taylor：

$$
y(x_{n+1}) = y_n + hy' + \tfrac{h^2}{2}y'' + O(h^3),\quad y' = f,\ y'' = f_x + f f_y
$$

匹配：

- $h$ 项：$A + B = 1$
- $h^2$ 项：$B\alpha = 1/2 \Rightarrow B = \dfrac{1}{2\alpha},\ A = 1 - \dfrac{1}{2\alpha}$

**最高阶 = 2 阶**（R-K2 公式族）。

#### Step 2：局部截断误差

$$
T_{n+1} = y(x_{n+1}) - y_{n+1} \approx h^3\left[\dfrac{1}{6}(\ldots) - B\dfrac{\alpha^2}{2}(\ldots)\right]
$$

详细展开：$T = \dfrac{h^3}{6}[(1 - 3B\alpha^2)(f_{xx} + 2f f_{xy} + f^2 f_{yy}) + f_y(f_x + f f_y)] + O(h^4)$

通常 $\alpha \ne 1/3$ 时三阶系数非零，故格式恰为 2 阶。

#### Step 3：绝对稳定区域

代入 $y' = \lambda y$，即 $f = \lambda y$：

$$
k_1 = \lambda y_n,\quad k_2 = \lambda(y_n + \alpha h\lambda y_n) = \lambda y_n(1 + \alpha\bar h)
$$

$$
y_{n+1} = y_n + Ah\lambda y_n + Bh\lambda y_n(1 + \alpha\bar h) = y_n[1 + (A+B)\bar h + B\alpha\bar h^2]
$$

$$
\Rightarrow E(\bar h) = 1 + \bar h + \tfrac{1}{2}\bar h^2
$$

**绝对稳定区域**：$|E(\bar h)| \le 1$。

实数情形：$\bar h \in [-2, 0]$。复平面情形为一个不含整个左半平面的有界区域。

**非 A-稳定**（显式方法都不 A-稳定）。

**易错点**：

- Taylor 匹配时 $f_x$ 和 $f f_y$ 等是同阶项，注意配齐
- R-K2 的 $E(\bar h)$ 恒为 $1 + \bar h + \bar h^2/2$（独立于 $\alpha$）

---

### T11. 原点位移幂法（★）

> **真题（2023 春 #9）**：对称实方阵 $A$，$\lambda_1 > \lambda_2 \ge \cdots \ge \lambda_n$。$B = A - sI$，幂法迭代 $x_{k+1} = Bx_k/\|Bx_k\|_2$。(1) 求 $s$ 范围使收敛到 $\lambda_1$ 对应特征向量。(2) 求 $s$ 使收敛最快。

#### (1) 收敛条件

$B$ 的特征值 $\mu_i = \lambda_i - s$。幂法对 $B$ 收敛到模最大特征值对应特征向量。需要

$$
|\lambda_1 - s| > |\lambda_i - s|,\ \forall i \ne 1
$$

对 $i \ne 1$，$\lambda_i$ 落在 $[\lambda_n, \lambda_2]$ 内，故只需

$$
|\lambda_1 - s| > \max(|\lambda_2 - s|, |\lambda_n - s|)
$$

由 $\lambda_1 > \lambda_2$，关键限制是 $|\lambda_1 - s| > |\lambda_n - s|$，即 $s < (\lambda_1 + \lambda_n)/2$。

且 $s \ne \lambda_1$。最终：

$$
\boxed{s < (\lambda_1 + \lambda_n)/2}
$$

#### (2) 最快收敛

收敛比 $r(s) = \dfrac{\max(|\lambda_2 - s|, |\lambda_n - s|)}{|\lambda_1 - s|}$，越小越快。

记 $u = \lambda_1 - s$，$v = \lambda_2 - s$，$w = \lambda_n - s$。在 (1) 范围内 $u > 0$。

当 $s$ 在 $\lambda_n$ 与 $\lambda_2$ 之间时 $|\lambda_2 - s| = v,\ |\lambda_n - s| = s - \lambda_n$。

**关键观察**：取 $s = (\lambda_2 + \lambda_n)/2$，则 $|\lambda_2 - s| = |\lambda_n - s| = (\lambda_2 - \lambda_n)/2$。此时

$$
r = \dfrac{(\lambda_2 - \lambda_n)/2}{\lambda_1 - (\lambda_2 + \lambda_n)/2} = \dfrac{\lambda_2 - \lambda_n}{2\lambda_1 - \lambda_2 - \lambda_n}
$$

这是最优选择（任何偏移都会使两边之一变大）。

$$
\boxed{s^* = (\lambda_2 + \lambda_n)/2}
$$

---

### T12. Householder QR 分解（★）

> **真题（2024 秋 #5(2)）**：$A = \begin{pmatrix}1 & 1 & 1\\ 2 & -1 & -1\\ 2 & -4 & 5\end{pmatrix}$。用 Householder 矩阵作 QR 分解。

**Step 1**：消第 1 列下方元素。取 $x = (1, 2, 2)^T$，$\|x\|_2 = 3$。令 $\alpha = -3$（取符号使无消去），$v = x - \alpha e_1 = (4, 2, 2)^T$，归一化 $w = v/\|v\| = (4, 2, 2)^T/\sqrt{24} = (2, 1, 1)^T/\sqrt 6$。

$$
H_1 = I - 2ww^T = \dfrac{1}{3}\begin{pmatrix}-1 & -2 & -2\\ -2 & 2 & -1\\ -2 & -1 & 2\end{pmatrix}
$$

$H_1 A$ 的第一列为 $(-3, 0, 0)^T$。计算其余两列：

$$
H_1 A = \begin{pmatrix}-3 & ? & ?\\ 0 & ? & ?\\ 0 & ? & ?\end{pmatrix}
$$

**Step 2**：对 $H_1 A$ 的子矩阵（$2\times 2$）消第 2 列下方。

最终 $R = H_2 H_1 A$，$Q = H_1^T H_2^T = H_1 H_2$（$H_i$ 对称）。

**易错点**：

- $\alpha = \pm\|x\|$ 中**取符号与 $x_1$ 相反**避免数值消去
- $H_i$ 对称正交，故 $H_i^T = H_i = H_i^{-1}$
- 嵌入到大矩阵时，对子矩阵的 $H$ 需补成 $\mathrm{diag}(I_{k-1}, \tilde H)$

---

### T13. Hermite 余项证明（不可用差商-导数关系）（★★）

> **真题（2022 秋 #4(2)）**：设 $H \in P_{2n+1}$ 是 $f$ 的 Hermite 插值多项式（满足 $H(x_i) = f(x_i),\ H'(x_i) = f'(x_i)$）。证明
> $$R(x) = f(x) - H(x) = \dfrac{f^{(2n+2)}(\xi)}{(2n+2)!}[\omega_{n+1}(x)]^2$$
> （**不可用差商与导数关系式**）

**证明**：固定 $x \ne x_0, \ldots, x_n$。构造辅助函数

$$
\varphi(t) = f(t) - H(t) - \lambda \cdot \omega_{n+1}^2(t)
$$

其中 $\omega_{n+1}(t) = \prod_{i=0}^n(t - x_i)$。**选取** $\lambda$ 使 $\varphi(x) = 0$，即

$$
\lambda = \dfrac{f(x) - H(x)}{\omega_{n+1}^2(x)}
$$

**分析 $\varphi$ 的零点**：

- $\varphi(x_i) = 0$（因 $H(x_i) = f(x_i)$ 且 $\omega(x_i) = 0$）
- $\varphi(x) = 0$（由 $\lambda$ 选取）

共 $n + 2$ 个零点。

**反复 Rolle**：

- $\varphi'$ 至少有 $n + 1$ 个不同于上述零点的零点；
- 又注意 $\varphi'(x_i) = f'(x_i) - H'(x_i) - 2\lambda\omega_{n+1}(x_i)\omega'_{n+1}(x_i) = 0 - 0 = 0$（前两项由 $H'(x_i) = f'(x_i)$ 抵消，第三项含 $\omega(x_i) = 0$）；
- 故 $\varphi'$ 实际至少有 $(n+1) + (n+1) = 2n + 2$ 个零点。

继续 Rolle 至 $\varphi^{(2n+2)}$：至少有 1 个零点 $\xi \in (a, b)$。

**导出 $\lambda$**：$\varphi^{(2n+2)}(t) = f^{(2n+2)}(t) - H^{(2n+2)}(t) - \lambda (\omega_{n+1}^2)^{(2n+2)}(t)$。

- $H \in P_{2n+1}$ ⇒ $H^{(2n+2)} = 0$
- $\omega_{n+1}^2 \in P_{2n+2}$ 的首项 $x^{2n+2}$ ⇒ $(\omega^2)^{(2n+2)} = (2n+2)!$

故 $0 = f^{(2n+2)}(\xi) - \lambda(2n+2)!$，得

$$
\lambda = \dfrac{f^{(2n+2)}(\xi)}{(2n+2)!}
$$

代回 $\lambda$ 的定义得证。$\square$

**易错点**：

- $\varphi'(x_i) = 0$ 这一步是关键（Hermite 比 Lagrange 多一倍零点的来源）
- 不可用 $f[x_0,\ldots,x_n] = f^{(n)}(\xi)/n!$（题目禁用）

---

### T14. 线性规划标准化 + 单纯形法（★ 必考）

> **真题（2022 秋 #1(2)）**：
> $$\min z = 2x_1 + x_2 - 4x_3,\quad \begin{cases}-x_1 + x_2 + x_3 = 4\\ -2x_1 + x_2 - x_3 \le 6\\ x_1 \le 0,\ x_2 \ge 0,\ x_3\text{ 无约束}\end{cases}$$

#### 标准化步骤

1. **$x_1 \le 0$**：令 $x_1 = -x_1',\ x_1' \ge 0$
2. **$x_3$ 无约束**：令 $x_3 = x_3' - x_3'',\ x_3', x_3'' \ge 0$
3. **$\le$ 约束**：加松弛变量 $x_4 \ge 0$

代入：

$$
\min z = -2x_1' + x_2 - 4x_3' + 4x_3''
$$

$$
\begin{cases}x_1' + x_2 + x_3' - x_3'' = 4\\ 2x_1' + x_2 - x_3' + x_3'' + x_4 = 6\end{cases}
$$

所有变量 $\ge 0$。

> **真题（2024 秋 #6）**：图解法 + 单纯形法解 $\min -x_1 - 3x_2$，$x_1 + x_2 \le 3$，$x_1 - 2x_2 \ge 2$，$x_1, x_2 \ge 0$。

**图解法**：可行域顶点 $(2,0),\ (3,0)$（注意约束 $x_1-2x_2 \ge 2$ 限制为下半区域），目标 $-x_1 - 3x_2$ 在 $(3, 0)$ 最小，$z^* = -3$。

**单纯形法**：等式化（$\le$ 加 $x_3$；$\ge$ 减 $x_4$，但右端需 $\ge 0$ 故再加人工变量，或用 $-x_4$ 改写）。

**易错点**：

- $x_i \le 0$ 用 $-x_i'$ 替换
- $x_i$ 无约束用 $x_i' - x_i''$ 替换（两个非负变量）
- $\ge$ 约束减剩余变量；$\le$ 约束加松弛变量

---

### T15. 向前 Euler 整体截断误差证明（★）

> **真题（2022 秋 #8）**：向前 Euler 公式解 $y' = f(x, y),\ y(a) = y_0$，$f$ 关于 $y$ 满足 Lipschitz 条件 $|f(x, y_1) - f(x, y_2)| \le L|y_1 - y_2|$，$|y''(x)| \le M$。证明
> $$|y(x_n) - y_n| \le \dfrac{hM}{2L}\left(e^{L(b-a)} - 1\right)$$

**证明**：记 $e_n = y(x_n) - y_n$。Taylor 展开

$$
y(x_{n+1}) = y(x_n) + h y'(x_n) + \dfrac{h^2}{2}y''(\xi_n) = y(x_n) + h f(x_n, y(x_n)) + \dfrac{h^2}{2}y''(\xi_n)
$$

向前 Euler：$y_{n+1} = y_n + h f(x_n, y_n)$。

相减：

$$
e_{n+1} = e_n + h[f(x_n, y(x_n)) - f(x_n, y_n)] + \dfrac{h^2}{2}y''(\xi_n)
$$

由 Lipschitz：

$$
|e_{n+1}| \le |e_n| + hL|e_n| + \dfrac{h^2 M}{2} = (1 + hL)|e_n| + \dfrac{h^2 M}{2}
$$

记 $C = h^2 M/2$，$\rho = 1 + hL$。由 $e_0 = 0$ 递推：

$$
|e_n| \le C\sum_{k=0}^{n-1}\rho^k = C\cdot\dfrac{\rho^n - 1}{\rho - 1} = \dfrac{h^2M/2}{hL}\cdot(\rho^n - 1) = \dfrac{hM}{2L}((1+hL)^n - 1)
$$

由 $(1 + hL)^n \le e^{nhL} = e^{L(x_n - a)} \le e^{L(b-a)}$：

$$
|e_n| \le \dfrac{hM}{2L}(e^{L(b-a)} - 1)\quad\square
$$

**易错点**：

- 递推公式中 $\rho = 1 + hL$ 不是 $hL$
- 用 $(1+x)^n \le e^{nx}$ 把幂转成指数

---

> 完成本轮后，进入 第三轮：公式速查


---

## 《计算方法》第三轮复习：公式速查与考前冲刺（应试导向版）

> **本轮目标**：考前 1–2 天的最终复习。按**考试频率**重新排列。建议时间：3–4 小时。

### 考前 30 分钟必看清单（基于 2022—2025 真题统计）

| 题型 | 公式/方法 | 出现 |
| --- | --- | --- |
| **范数填空** | $\|A\|_1$ 列和最大；$\|A\|_\infty$ 行和最大；$\rho(A)$ | 4 次 |
| **Hermite 插值** | Newton 差商表（重节点用 $f[x_i,x_i]=f'(x_i)$） | 4 次 |
| **最佳平方+一致逼近** | 法方程 $G\mathbf{c}=\mathbf{b}$；交错 $n+2$ 点 | 5 次 |
| **含参矩阵迭代** | $\rho(G_J), \rho(G_{GS})$ < 1 | 3 次 |
| **R-K 二阶+稳定性** | $A+B=1, B\alpha=1/2$；$E(\bar h)=1+\bar h+\bar h^2/2$ | 3 次 |
| **带权 Gauss 积分** | 正交化→零点→系数 | 3 次 |
| **设计 p 阶迭代** | $\varphi^{(k)}(s)=0, k=1,\ldots,p-1$ | 3 次 |
| **线性规划标准化** | $\le$ 加松弛，$\ge$ 减剩余，无约束拆分 | 4 次 |

---

### 一、范数与条件数（每年填空必考）

#### 向量范数

| 名称 | 定义 |
| --- | --- |
| 1-范数 | $\|\mathbf{x}\|_1 = \sum \lvert x_i\rvert$ |
| 2-范数 | $\|\mathbf{x}\|_2 = \sqrt{\sum x_i^2}$ |
| ∞-范数 | $\|\mathbf{x}\|_\infty = \max \lvert x_i\rvert$ |

#### 矩阵范数（**速记：1 列 ∞ 行**）

| 名称 | 公式 |
| --- | --- |
| $\|A\|_1$ | $\max_j \sum_i \lvert a_{ij}\rvert$（**列**和最大） |
| $\|A\|_\infty$ | $\max_i \sum_j \lvert a_{ij}\rvert$（**行**和最大） |
| $\|A\|_2$ | $\sqrt{\rho(A^TA)}$（谱范数） |
| $\rho(A)$ | $\max\lvert\lambda_i\rvert$（谱半径） |

**填空套路**：题目给 3×3 矩阵 → 立刻心算列和、行和；2×2 或 3×3 矩阵的谱半径需先求特征多项式。

**条件数**：$\mathrm{Cond}(A) = \|A\|\cdot\|A^{-1}\|$；$\dfrac{\|\delta x\|}{\|x\|} \le \mathrm{Cond}(A)\dfrac{\|\delta b\|}{\|b\|}$。

---

### 二、Newton 法构造 Hermite 插值（年年考）

#### 差商表规则

- 节点 $x_i$ 重复 $k+1$ 次 ⇔ 提供至 $k$ 阶导信息
- **重节点的一阶差商**：$f[x_i, x_i] = f'(x_i)$
- **更高阶重节点**：$f[\underbrace{x_i,\ldots,x_i}_{k+1}] = \dfrac{f^{(k)}(x_i)}{k!}$

#### Newton 形式

$$
H(x) = \sum_{k} f[x_0,\ldots,x_k]\prod_{i=0}^{k-1}(x - x_i)
$$

其中 $(x-x_i)$ 按差商表的实际节点序列依次相乘（重复节点重复出现）。

#### 例：节点序列 $\{1,1,2,3,3\}$

$$
H_4(x) = f_0 + f[x_0,x_1](x-1) + f[x_0,x_1,x_2](x-1)^2 + f[x_0,x_1,x_2,x_3](x-1)^2(x-2) + f[x_0,\ldots,x_4](x-1)^2(x-2)(x-3)
$$

---

### 三、最佳平方/一致逼近（年年考）

#### 最佳平方逼近（法方程法）

设逼近 $m^*(x) = \sum c_i\varphi_i(x)$，权 $\rho(x)$：

$$
G_{ij} = \int_a^b \rho \varphi_i\varphi_j dx,\quad b_j = \int_a^b \rho f\varphi_j dx
$$

法方程 $G\mathbf{c} = \mathbf{b}$。**正交基下**：$c_i = (f, \varphi_i)/(\varphi_i, \varphi_i)$。

#### 一次最佳一致逼近 $p_1(x) = c_0 + c_1 x$（**端点法**）

> 3 个交错点：$a,\ x^*,\ b$。

1. $c_1 = \dfrac{f(b) - f(a)}{b - a}$（**弦斜率**）
2. $x^*$ 由 $f'(x^*) = c_1$ 解出
3. $c_0 = \tfrac{1}{2}[f(a) + f(x^*)] - c_1\tfrac{a + x^*}{2}$

#### Chebyshev 最小零偏差（$\max|x^n - p_{n-1}(x)|$）

> 在 $[-1, 1]$ 上：$\min_{p_{n-1}}\max|x^n - p_{n-1}| = 2^{1-n}$，取 $p$ 使 $x^n - p = 2^{1-n}T_n(x)$。

#### Chebyshev 多项式速查

$T_n(x) = \cos(n\arccos x)$，$T_0=1, T_1=x, T_2=2x^2-1, T_3=4x^3-3x$。

零点：$x_k = \cos\dfrac{(2k-1)\pi}{2n}$。

---

### 四、含参矩阵迭代收敛性（年年考）

#### 三种迭代矩阵速查

| 方法 | 分裂 $A = Q - P$ | 迭代矩阵 $G = Q^{-1}P$ |
| --- | --- | --- |
| Jacobi | $Q = D$ | $G_J = -D^{-1}(L+U) = I - D^{-1}A$ |
| Gauss-Seidel | $Q = D + L$ | $G_{GS} = -(D+L)^{-1}U$ |
| SOR | $Q = D/\omega + L$ | $G_\omega = (D+\omega L)^{-1}((1-\omega)D - \omega U)$ |
| **JOR** | $Q = D/\omega$ | $G_{JOR} = I - \omega D^{-1}A$ |

#### 收敛性判据

- **充要**：$\rho(G) < 1$
- **充分**：$\|G\|_\infty < 1$ 或 $\|G\|_1 < 1$；严格对角占优 ⇒ Jacobi、GS 都收敛；对称正定 ⇒ GS、SOR ($0<\omega<2$) 收敛
- **必要**：SOR 收敛 ⇒ $0 < \omega < 2$（由 $\det(S_\omega) = (1-\omega)^n$）
- **JOR 收敛证明**：Jacobi 收敛 + $0 < \omega \le 1$ ⇒ JOR 收敛（$|1-\omega\lambda| \le |1-\omega| + \omega|1-\lambda| < 1$）

#### SOR 推广收敛（$A$ 对称正定）

$$
0 < \omega < \dfrac{2}{\lambda_{\max}(A)} \Rightarrow x_{k+1} = x_k + \omega(b - Ax_k)\text{ 收敛}
$$

证：$G = I - \omega A$ 特征值 $1 - \omega\lambda_i$，$|1-\omega\lambda| < 1 \Leftrightarrow 0 < \omega\lambda < 2$。

#### 含参矩阵套路

1. 写出 $G$，参数留在里面
2. 求特征值（利用稀疏性）
3. 解 $|\lambda| < 1$ 反推参数范围

**典型结论**（三对角对称 $A$）：$\rho(G_{GS}) = \rho(G_J)^2$，故 Jacobi、GS 同时收敛/发散。

---

### 五、Newton 法与高阶迭代格式（必考）

#### Newton 迭代

$$
x_{k+1} = x_k - \dfrac{f(x_k)}{f'(x_k)}
$$

| 情形 | 收敛阶 |
| --- | --- |
| 单根 | **2 阶** |
| $p$ 重根 | **1 阶**（$\varphi'(s) = 1 - 1/p$） |
| 修正 $x_{k+1} = x_k - p\cdot f/f'$ | **2 阶** |

#### 收敛阶判别（核心工具）

> $\varphi^{(k)}(s) = 0,\ k = 1,\ldots,p-1$，$\varphi^{(p)}(s) \ne 0$ ⇒ $p$ 阶收敛。
>
> 此时 $\lim\dfrac{e_{n+1}}{e_n^p} = \dfrac{\varphi^{(p)}(s)}{p!}$。

#### 设计 $p$ 阶格式套路

1. 写出 $\varphi(x; \text{参数})$
2. 强制 $\varphi(s) = s$
3. 依次 $\varphi'(s) = 0,\ \varphi''(s) = 0,\ldots$ 解参数
4. **技巧**：含 $f(x)$ 因子的项在 $s$ 处为 0，求导时只看不含 $f$ 的项

#### 三阶法（Halley/Chebyshev）

$$
x_{k+1} = x_k - \dfrac{f}{f'} - \dfrac{f''f^2}{2(f')^3}
$$

---

### 六、Gauss 型数值积分（年年考）

#### 构造步骤（带权 $w(x)$）

1. 定义内积 $(f, g) = \int_a^b w(x) f g\,dx$
2. **Gram-Schmidt** 正交化 $\{1, x, x^2, \ldots\}$ 得 $\{\beta_0, \beta_1, \ldots, \beta_n\}$
3. **节点** $x_i$ = $\beta_n(x) = 0$ 的根
4. **系数** $A_i$ 由低次精确反推（或 $A_i = \int_a^b w(x) l_i(x) dx$）
5. **代数精度** = $2n - 1$（$n$ 节点）

#### 误差估计

$$
E = \dfrac{f^{(2n)}(\xi)}{(2n)!}\int_a^b q^2(x) w(x) dx,\quad q(x) = \prod(x-x_i)
$$

#### Gauss-Legendre 节点表（速记）

| $n$ | $t_i$ | $A_i$ |
| --- | --- | --- |
| 2 | $\pm 1/\sqrt 3$ | 1 |
| 3 | $0, \pm\sqrt{3/5}$ | $8/9, 5/9$ |

**变换**：$\int_a^b f dx = \dfrac{b-a}{2}\sum A_i f\left(\dfrac{a+b}{2} + \dfrac{b-a}{2}t_i\right)$。

#### 常用正交多项式（必背权与区间）

| 名称 | 权 | 区间 | 三项递推 |
| --- | --- | --- | --- |
| Legendre $P_n$ | 1 | $[-1, 1]$ | $(n+1)P_{n+1} = (2n+1)xP_n - nP_{n-1}$ |
| Chebyshev $T_n$ | $1/\sqrt{1-x^2}$ | $[-1, 1]$ | $T_{n+1} = 2xT_n - T_{n-1}$ |
| Laguerre $L_n$ | $e^{-x}$ | $[0, \infty)$ | — |
| Hermite $H_n$ | $e^{-x^2}$ | $\mathbb R$ | — |

#### 复化求积速查

| 公式 | 表达 | 代数精度 |
| --- | --- | --- |
| 梯形 | $\dfrac{b-a}{2}[f(a)+f(b)]$ | 1 |
| Simpson | $\dfrac{b-a}{6}[f(a)+4f(\tfrac{a+b}{2})+f(b)]$ | 3 |
| 复化梯形 $T_n$ | $h[f_0/2 + \sum_{i=1}^{n-1}f_i + f_n/2]$ | $O(h^2)$ |
| 复化 Simpson $S_n$ ($n=2m$) | $\dfrac{h}{3}[f_0 + 4\sum_\text{奇}f_i + 2\sum_\text{偶}f_i + f_n]$ | $O(h^4)$ |

**复化梯形 + 修正**：

$$
\int_a^b f dx = \dfrac{b-a}{2}[f(a)+f(b)] - \dfrac{(b-a)^2}{12}[f'(b)-f'(a)] + \dfrac{f^{(4)}(\xi)}{720}(b-a)^5
$$

---

### 七、R-K 公式与稳定性（年年考）

#### 二阶 R-K 模板

$$
\begin{cases}k_1 = f(x_n, y_n)\\ k_2 = f(x_n+\alpha h, y_n+\alpha hk_1)\\ y_{n+1} = y_n + h(Ak_1 + Bk_2)\end{cases}
$$

**待定系数关系**：$A + B = 1$，$B\alpha = 1/2$。常见：

- $\alpha = 1/2,\ B = 1,\ A = 0$（中点法）
- $\alpha = 1,\ A = B = 1/2$（改进 Euler）

#### 四阶 R-K（必背）

$$
y_{n+1} = y_n + \dfrac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)
$$

$k_1 = f(x_n, y_n)$；$k_2, k_3$ 用半步长；$k_4$ 用全步长。

#### 绝对稳定区域（代入 $y' = \lambda y$）

| 方法 | $E(\bar h)$ | 实区间 |
| --- | --- | --- |
| 显式 Euler | $1 + \bar h$ | $(-2, 0)$ |
| 隐式 Euler | $1/(1-\bar h)$ | **A-稳定** |
| 梯形 | $(2+\bar h)/(2-\bar h)$ | **A-稳定** |
| 改进 Euler / R-K2 | $1 + \bar h + \bar h^2/2$ | $(-2, 0)$ |
| 经典 R-K4 | $1+\bar h+\bar h^2/2+\bar h^3/6+\bar h^4/24$ | $(-2.785, 0)$ |

**A-稳定** = 稳定区域 = 整个左半复平面。显式方法都不 A-稳定。

#### Euler 整体截断误差（典型证明）

> 向前 Euler + Lipschitz $L$ + $|y''| \le M$：
>
> $$|y(x_n) - y_n| \le \dfrac{hM}{2L}(e^{L(b-a)} - 1)$$

**证明骨架**：$|e_{n+1}| \le (1+hL)|e_n| + h^2M/2$；递推 + $(1+hL)^n \le e^{nhL}$。

---

### 八、原点位移幂法（频繁考）

> 对称矩阵 $\lambda_1 > \lambda_2 \ge \cdots \ge \lambda_n$，$B = A - sI$ 幂法：

| 目标 | $s$ 选取 |
| --- | --- |
| 收敛到 $\lambda_1$ 对应向量 | $s < (\lambda_1 + \lambda_n)/2$（且 $s \ne \lambda_1$） |
| 最快速度 | $s^* = (\lambda_2 + \lambda_n)/2$ |
| 收敛比 | $r = \dfrac{\lambda_2 - \lambda_n}{2\lambda_1 - \lambda_2 - \lambda_n}$ |

幂法速率比 = $|\mu_{次大}/\mu_{最大}|$，原点位移即调控这个比。

#### 反幂法

$Ax^{(k+1)} = x^{(k)} \Rightarrow$ 求模最小特征值；带位移反幂法 $(A-\mu I)x^{(k+1)} = x^{(k)}$ 求最接近 $\mu$ 的特征值。

---

### 九、Householder QR 分解

#### Householder 矩阵

$$
H = I - 2ww^T,\quad \|w\|_2 = 1
$$

对给定 $x$：取 $\alpha = -\mathrm{sign}(x_1)\|x\|_2$（避免消去），$v = x - \alpha e_1$，$w = v/\|v\|$，则

$$
Hx = \alpha e_1 = (\alpha, 0, \ldots, 0)^T
$$

$H$ 对称正交：$H^T = H = H^{-1}$。

#### QR 分解步骤

第 $k$ 步：对子矩阵第 1 列构造 $\tilde H_k$ 使其下方全 0；嵌入为 $H_k = \mathrm{diag}(I_{k-1}, \tilde H_k)$。

$$
R = H_{n-1}\cdots H_1 A,\quad Q = H_1\cdots H_{n-1}
$$

---

### 十、线性规划（年年考）

#### 化标准型五条规则

| 原约束 | 处理 |
| --- | --- |
| $\sum a_j x_j \le b$ | 加**松弛变量** $x_s \ge 0$ |
| $\sum a_j x_j \ge b$ | 减**剩余变量** $x_s \ge 0$ |
| $x_i \le 0$ | 令 $x_i = -x_i',\ x_i'\ge 0$ |
| $x_i$ 无约束 | $x_i = x_i' - x_i'',\ x_i', x_i'' \ge 0$ |
| $\max z$ | $\min(-z)$ |

#### 单纯形法步骤

1. **初始基可行解**：松弛/人工变量构成单位阵
2. **检验数** $\sigma_j = c_j - c_B^T B^{-1}\mathbf{p}_j$
3. **判别**：
   - 全 $\sigma_j \le 0$：**最优**
   - $\exists \sigma_j > 0$ 且 $\mathbf{p}_j \le 0$：**无界**
   - 否则取 $\max\sigma_j$ 对应列**进基**
4. **换出**：$\min_i\{b_i/a_{ij} : a_{ij} > 0\}$ 对应行**出基**
5. 主元高斯消元更新

---

### 十一、易混淆概念辨析

| 容易混 | 区别 |
| --- | --- |
| 插值 / 拟合 | 插值过点；拟合不一定过点 |
| Newton 法（求根）/ Newton 插值 | 前者解方程；后者构造多项式 |
| $\|A\|_1$ / $\|A\|_\infty$ | **列和 1，行和 ∞** |
| 局部 / 整体截断误差 | $O(h^{p+1})$ vs $O(h^p)$ |
| 绝对稳定 / A-稳定 | A-稳定 = 区域含整个左半平面 |
| 充分 / 充要条件 | 严格对角占优是 Jacobi 收敛**充分**；$\rho(G)<1$ 是**充要** |
| 单根 / 重根 Newton | 单根 2 阶；$p$ 重根 1 阶；修正后 2 阶 |
| Doolittle / Crout | Doolittle: $L$ 单位下三角；Crout: $U$ 单位上三角 |

---

### 十二、考场检查清单

#### 通用

- [ ] 矩阵题：判断维度、对称性、稀疏性
- [ ] 是否要求最低阶 / 最高阶？
- [ ] 是否要给出**误差表达式**？

#### 按题型

- [ ] **Hermite**：节点重复次数 = 导阶数 + 1？$f[x_i, x_i] = f'(x_i)$ 用了吗？
- [ ] **范数填空**："1 列 ∞ 行"对了吗？
- [ ] **LU 分解**：$L$ 是哪种单位三角？
- [ ] **Newton 迭代**：单根 vs 重根？是否需修正？
- [ ] **设计 $p$ 阶**：$\varphi^{(k)}(s) = 0,\ k = 1, \ldots, p-1$ 全部用了吗？
- [ ] **含参矩阵**：$\rho(G)$ 的特征值算对了吗？
- [ ] **Gauss 积分**：正交多项式做归一化没？节点和系数对称性利用了？
- [ ] **R-K**：$A+B=1, B\alpha=1/2$ 用了吗？$E(\bar h)$ 写完整了？
- [ ] **逼近**：弦斜率 $c_1 = (f(b)-f(a))/(b-a)$ 用了？$f'(x^*) = c_1$ 解了？
- [ ] **LP 标准化**：5 条规则都覆盖了吗？
- [ ] **原点位移**：$(\lambda_2 + \lambda_n)/2$ 是最快？

---

### 十三、常用数值

| 量 | 值 |
| --- | --- |
| $1/\sqrt 3$ | $\approx 0.5774$ |
| $\sqrt{3/5}$ | $\approx 0.7746$ |
| $\sqrt{5/7}$ | $\approx 0.8452$ |
| $\sqrt{35}/7$ | $\approx 0.8452$ |
| 黄金分割 $\tau$ | 0.618 |
| $1 - \tau$ | 0.382 |
| $\sqrt 2, \sqrt 3, \sqrt 5$ | 1.4142, 1.7321, 2.2361 |
| $e, \pi, \ln 2$ | 2.7183, 3.1416, 0.6931 |

---

### 十四、考前一晚最后的 7 个母题

> 把这 7 题在脑中"默写一遍"，覆盖每年 60% 以上分值：

1. **Newton 差商表构造 Hermite 多项式**（节点 $\{1,1,2,3,3\}$ 类型）
2. **法方程 + 一次最佳一致逼近**（$\sin x, e^x, x^3$ 在 $[-1,1]$ 或 $[0, \pi/2]$ 上）
3. **设计 3 阶/4 阶迭代格式**（$\varphi(x) = x - a(x)f(x) + b(x)f^2(x)$ 类型）
4. **JOR/SOR 收敛证明**（特征值不等式 $|1-\omega\lambda| < 1$）
5. **带权 Gauss 两点积分构造**（Gram-Schmidt → 零点 → 系数）
6. **二阶 R-K 待定系数 + $E(\bar h)$**（$y_{n+1} = y_n + h(Ak_1 + Bk_2)$）
7. **线性规划标准化 + 1–2 步单纯形**

---

> **祝考试顺利！** 临考前回顾这份速查 → 翻 第二轮 错题 → 保持冷静，把熟练题型先做完。


---

## 复习资料补充——基于往年题的高频考点

> 以下内容是对10章复习资料的**补充和拓展**，基于四套往年期末考试真题中暴露出的知识点空白。

---

### Ch1 补充：Lagrange 插值的重心形式（Barycentric Form）

#### 为什么需要重心形式？

标准 Lagrange 形式每次求值需要 $O(n^2)$ 次运算，且增加节点时全部重算。Newton 形式解决了承袭性问题，但仍需 $O(n^2)$。**重心形式**将求值降到 $O(n)$，且数值稳定性极好。

#### 定义

记 $\Psi_n(x) = \prod_{i=0}^{n}(x - x_i)$，节点权重 $w_j = \frac{1}{\Psi_n'(x_j)} = \frac{1}{\prod_{i \neq j}(x_j - x_i)}$。

则 Lagrange 插值多项式可写为：

$$p_n(x) = \frac{\sum_{j=0}^{n} \frac{w_j}{x - x_j}f(x_j)}{\sum_{j=0}^{n} \frac{w_j}{x - x_j}} \quad (x \neq x_i)$$

当 $x = x_i$ 时，$p_n(x_i) = f(x_i)$。

#### 推导

Lagrange 基函数 $l_j(x) = \frac{\Psi_n(x)}{(x-x_j)\Psi_n'(x_j)} = \frac{\Psi_n(x)w_j}{x-x_j}$

$$p_n(x) = \Psi_n(x) \sum_{j=0}^{n} \frac{w_j}{x-x_j}f(x_j)$$

对常函数 $f \equiv 1$ 用同一公式：$1 = \Psi_n(x) \sum_{j=0}^{n} \frac{w_j}{x-x_j}$。两式相除即得重心形式。

#### 优点

- **$O(n)$ 求值**：分子分母同时计算
- **数值稳定**：即使在高次插值下也比标准 Lagrange 稳定
- **节点权重 $w_j$ 只与节点有关**，与 $f$ 无关，可预计算

---

### Ch2 补充：矛盾方程组的最小二乘解

#### 问题背景

当方程个数 $m$ 多于未知数个数 $n$ 时，$A\mathbf{x} = \mathbf{b}$（$A \in \mathbb{R}^{m \times n}, m > n$）一般**无精确解**（称为**矛盾方程组**或**超定方程组**）。

#### 最小二乘解

求 $\mathbf{x}$ 使残差 $\|\mathbf{b} - A\mathbf{x}\|_2$ 最小：

$$\mathbf{x}_{LS} = \arg\min_{\mathbf{x}} \|\mathbf{b} - A\mathbf{x}\|_2^2$$

**法方程：** $A^T A \mathbf{x} = A^T \mathbf{b}$

#### QR 方法求解（更稳定）

对 $A$ 做 QR 分解：$A = QR$（$Q$ 为 $m \times m$ 正交矩阵，$R$ 为 $m \times n$ 上梯形）。

$$\|\mathbf{b} - A\mathbf{x}\|_2 = \|Q^T\mathbf{b} - R\mathbf{x}\|_2 = \left\|\begin{pmatrix} \mathbf{c}_1 \\ \mathbf{c}_2 \end{pmatrix} - \begin{pmatrix} R_1 \\ 0 \end{pmatrix}\mathbf{x}\right\|_2$$

其中 $R_1$ 为 $n \times n$ 上三角。最小二乘解即为 $R_1\mathbf{x} = \mathbf{c}_1$ 的解。

---

### Ch3 补充一：数值微分公式的 Taylor 展开构造法

#### 通用方法

用 $k+1$ 个节点构造 $f^{(p)}(x_0)$ 的 $m$ 阶精度近似公式。

**步骤：**
1. 写出待定形式：$f^{(p)}(x_0) \approx \sum_{j=0}^{k} c_j f(x_j)$
2. 将每个 $f(x_j)$ 在 $x_0$ 处 Taylor 展开到 $O(h^{k+p})$ 阶
3. 令 $f(x_0), f'(x_0), \ldots, f^{(p-1)}(x_0), f^{(p+1)}(x_0), \ldots, f^{(k+p-1)}(x_0)$ 的系数为 0
4. 令 $f^{(p)}(x_0)$ 的系数为 1
5. 解得所有 $c_j$

#### 例题：三点一阶导数

用 $x=0, h, 2h$ 构造 $f'(0)$ 的最高精度近似：

$$f'(0) \approx c_0 f(0) + c_1 f(h) + c_2 f(2h)$$

展开得方程组：
$$\begin{cases} c_0 + c_1 + c_2 = 0 \\ c_1 h + 2c_2 h = 1 \\ c_1 h^2/2 + 2c_2 h^2 = 0 \end{cases}$$

解出 $c_0 = -\frac{3}{2h}, c_1 = \frac{2}{h}, c_2 = -\frac{1}{2h}$。截断误差 $O(h^2)$。

---

### Ch3 补充二：带导数值的数值积分公式

#### Gauss-Turán 型求积

形如 $\int_a^b w(x)f(x)dx \approx \sum A_k f(x_k) + \sum B_k f'(x_k)$ 的公式，可通过待定系数法最大化代数精度。

**方法：** 将 $f(x)$ 在合适点 Taylor 展开，令 $f=1,x,x^2,\ldots$ 精确成立，解出节点和系数。

有 $p$ 个函数值节点和 $q$ 个导数值节点时，最高代数精度为 $2p + q - 1$。

---

### Ch4 补充一：三阶收敛迭代公式的构造

#### 问题

求 $\varphi(x) = x - a(x)f(x) + b(x)f^2(x)$ 中的 $a(x), b(x)$ 使在单重根附近三阶收敛。

#### 解法

三阶条件：$\varphi(s) = s, \varphi'(s) = 0, \varphi''(s) = 0$。

计算（利用 $f(s)=0, f'(s) \neq 0$）：

$$\varphi'(s) = 1 - a(s)f'(s) = 0 \Rightarrow a(s) = \frac{1}{f'(s)}$$

$$\varphi''(s) = -a'(s)f'(s) - a(s)f''(s) + 2b(s)[f'(s)]^2 = 0$$

选 $a(x) \equiv \frac{1}{f'(x)}$，则 $a'(x) = -\frac{f''(x)}{[f'(x)]^2}$。代入得：

$$\frac{f''(s)}{f'(s)} - \frac{f''(s)}{f'(s)} + 2b(s)[f'(s)]^2 = 0 \quad\Rightarrow\quad 2b(s)[f'(s)]^2 = 0$$

这暗示 $b(s) = 0$。进一步令 $b(x) = \frac{f''(x)}{2[f'(x)]^3}$ 可消去下一个条件中的相关项，实现三阶收敛。

---

### Ch4 补充二：Aitken $\Delta^2$ 加速与 Steffensen 方法

#### Aitken 加速

对线性收敛序列 $\{x_n\}$（收敛因子为常数），Aitken 加速：
$$\hat{x}_n = x_n - \frac{(x_{n+1} - x_n)^2}{x_{n+2} - 2x_{n+1} + x_n}$$

可将一阶收敛加速到约二阶。

#### Steffensen 方法

将 Aitken 加速嵌入不动点迭代中，得到的迭代函数：
$$x_{n+1} = x_n - \frac{[f(x_n)]^2}{f(x_n + f(x_n)) - f(x_n)}$$

> 与 Newton 法类似但**不需要导数**，二阶收敛！

---

### Ch5 补充：Householder 变换与 QR 分解

#### Householder 矩阵

对任意非零向量 $\mathbf{v}$：
$$H = I - 2\frac{\mathbf{v}\mathbf{v}^T}{\mathbf{v}^T\mathbf{v}}$$

**性质：**
- $H = H^T = H^{-1}$（对称正交）
- $\det(H) = -1$（反射变换）
- 对任意 $\mathbf{x}$，可取 $\mathbf{v} = \mathbf{x} \pm \|\mathbf{x}\|_2 \mathbf{e}_1$ 使 $H\mathbf{x} = \mp\|\mathbf{x}\|_2 \mathbf{e}_1$

#### 用 Householder 变换做 QR 分解

逐列消元：对 $A$ 的第 $k$ 列，构造 $H_k$ 将该列对角线以下元素全变为 0：
$$H_k H_{k-1} \cdots H_1 A = R$$
$$Q = H_1 H_2 \cdots H_k$$

> Householder QR 比 Gram-Schmidt **数值更稳定**（后者可能失去正交性）。

---

### Ch5 补充：列对角占优与 Gauss 消元

#### 定义

$A$ 为**严格列对角占优**：$|a_{kk}| > \sum_{j \neq k} |a_{jk}|, \quad k = 1, \ldots, n$

（注意与**行对角占优**的区别——求和沿列方向）

#### 性质

若 $A$ 严格列对角占优，则：
1. $A$ 非奇异
2. 顺序 Gauss 消元**不需要换行**（主元自然在当前位置）
3. 顺序 Gauss 消元与列主元 Gauss 消元**结果完全相同**

#### 证明思路

第一步消元后，Schur 补仍保持列对角占优性质（归纳证明）。

---

### Ch6 补充：JOR 方法（Jacobi 松弛法）

#### 定义

在 Jacobi 迭代中引入松弛参数 $\omega > 0$：
$$\mathbf{x}_{k+1} = \mathbf{x}_k - \omega D^{-1}(A\mathbf{x}_k - \mathbf{b})$$

#### 迭代矩阵

$$\mathbf{G}_{\text{JOR}} = I - \omega D^{-1}A = (1-\omega)I + \omega \mathbf{G}_J$$

#### 收敛性

- 若 Jacobi 收敛（$\rho(\mathbf{G}_J) < 1$）且 $0 < \omega \leq 1$，则 JOR 必收敛
- $\rho(\mathbf{G}_{\text{JOR}}) \leq (1-\omega) + \omega\rho(\mathbf{G}_J) < 1$
- $\omega > 1$ 时可能发散
- 类似 SOR 但基于 Jacobi 而非 Gauss-Seidel

---

### Ch8 补充一：线性多步法的 Taylor 展开构造

#### 通用方法

对 $k$ 步法 $y_{n+1} + \sum_{j=0}^{k-1} \alpha_j y_{n-j} = h\sum_{j=-1}^{k-1} \beta_j f_{n-j}$，将各项在 $x_n$ 处 Taylor 展开，依次匹配 $h^0, h^1, \ldots$ 的系数。

**局部截断误差定义：**
$$T_{n+1} = y(x_{n+1}) - y_{n+1} \quad \text{（假设之前各步精确）}$$

#### 阶数条件

$p$ 阶方法要求前 $p+1$ 个方程成立：
$$C_0 = C_1 = \cdots = C_p = 0, \quad C_{p+1} \neq 0$$

其中 $C_q$ 由展开系数确定。

---

### Ch8 补充二：绝对稳定区间计算

#### 定义

对测试方程 $y' = \lambda y$（$\lambda < 0$），离散方法产生 $y_{n+1} = R(h\lambda) y_n$。绝对稳定域为 $\{z = h\lambda \in \mathbb{C} : |R(z)| \leq 1\}$。

#### 常见方法的稳定函数 $R(z)$

| 方法 | $R(z)$ | 稳定区间 |
|------|--------|---------|
| 向前 Euler | $1 + z$ | $[-2, 0]$ |
| 向后 Euler | $\frac{1}{1-z}$ | $(-\infty, 0]$ |
| 梯形公式 | $\frac{1+z/2}{1-z/2}$ | $(-\infty, 0]$ |
| 中点公式 | $1 + z + z^2/2$ | $[-2, 0]$ |
| RK4 | $1 + z + z^2/2 + z^3/6 + z^4/24$ | $\approx [-2.785, 0]$ |

---

### Ch10 补充：精确一维搜索的步长计算

#### 问题

梯度下降法中，沿方向 $\mathbf{d}_k = -\nabla f(\mathbf{x}_k)$ 找最优步长：

$$\lambda_k = \arg\min_{\lambda > 0} \phi(\lambda) = \arg\min_{\lambda > 0} f(\mathbf{x}_k + \lambda \mathbf{d}_k)$$

#### 二次函数的情形

若 $f(\mathbf{x}) = \frac{1}{2}\mathbf{x}^T Q \mathbf{x} - \mathbf{b}^T\mathbf{x} + c$（$Q$ 对称正定），则 $\phi(\lambda)$ 是 $\lambda$ 的二次函数：

$$\phi(\lambda) = \frac{1}{2}(\mathbf{d}_k^T Q \mathbf{d}_k)\lambda^2 + (\nabla f_k^T \mathbf{d}_k)\lambda + f(\mathbf{x}_k)$$

$$\phi'(\lambda) = (\mathbf{d}_k^T Q \mathbf{d}_k)\lambda + \nabla f_k^T \mathbf{d}_k = 0$$

$$\lambda_k = -\frac{\nabla f_k^T \mathbf{d}_k}{\mathbf{d}_k^T Q \mathbf{d}_k}$$

#### 一般函数的处理

对一般 $f$，$\phi(\lambda)$ 不是二次函数，需用一维搜索方法（0.618 法、二分法等）求 $\lambda_k$。

---

### 📊 补充知识速查表

| 补充知识点 | 所属章节 | 考题出现频率 | 重要程度 |
|-----------|---------|------------|---------|
| Lagrange 重心形式 | Ch1 | 1次 | ⭐⭐ |
| 矛盾方程组最小二乘 + QR | Ch2 | 2次 | ⭐⭐⭐ |
| Taylor 展开构造数值微分 | Ch3 | 2次 | ⭐⭐⭐ |
| 带导数值的 Gauss 求积 | Ch3 | 2次 | ⭐⭐ |
| 三阶收敛迭代构造 | Ch4 | 2次 | ⭐⭐⭐ |
| Aitken/Steffensen 加速 | Ch4 | 1次 | ⭐⭐ |
| Householder 变换 + QR | Ch5/Ch7 | 4次 | ⭐⭐⭐⭐ |
| 列对角占优 | Ch5 | 2次 | ⭐⭐ |
| JOR 方法 | Ch6 | 1次 | ⭐⭐ |
| 线性多步法 Taylor 构造 | Ch8 | 3次 | ⭐⭐⭐⭐ |
| 绝对稳定区间 | Ch8 | 2次 | ⭐⭐⭐ |
| 精确一维搜索 | Ch10 | 1次 | ⭐⭐ |
