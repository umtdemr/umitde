<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<section class="about">
	<h1 class="section_title">About</h1>
	<div class="section_desc">
		<p>
			Hi, I'm Ümit (means hope in Turkish), and I'm a software engineer.
			I live in Istanbul Turkey.
		</p>
		<p>
			I love coding, problem solving, fitness and photography.
			Unlike most of the developers, I'm not that much into coffee.
			Yes, I like it but I'm not particular about the beans or the brewing method.
		</p>
		<p>
			I use Typescript, React, Svelte, Node js, Go and Python at my projects.
		</p>
		<p>
			To contact me, you can send a mail to <a href="mailto:umitde296@gmail.com">umitde296@gmail.com</a>
		</p>
	</div>
</section>
<section class="journey">
	<h1 class="section_title">Journey</h1>
	<div class="journey_list">
		<div class="journey__content">
			<span class="journey__content--year">2023</span>
			<div class="journey__content--list">
				<div class="journey__item">
				<span class="journey__item--step">
					<span class="step_circle">
						<span class="step_circle_inner">
						</span>
					</span>
					<span class="step_stick"></span>
				</span>
					<span class="journey__item--title">Working on there</span>
					<p class="journey__item--info">Lorem ipsum dolor sit amet consectetur. Fringilla eget imperdiet quis ullamcorper egestas. Potenti nibh orci pretium euismod tortor ipsum. Malesuada dolor id scelerisque viverra eleifend magna hendrerit viverra faucibus. Quis massa amet purus sit diam neque eleifend lectus iaculis.</p>
				</div>
				<div class="journey__item">
				<span class="journey__item--step">
					<span class="step_circle">
						<span class="step_circle_inner">
						</span>
					</span>
				</span>
					<span class="journey__item--title">Working on there</span>
					<p class="journey__item--info">Lorem ipsum dolor sit amet consectetur. Fringilla eget imperdiet quis ullamcorper egestas. Potenti nibh orci pretium euismod tortor ipsum. Malesuada dolor id scelerisque viverra eleifend magna hendrerit viverra faucibus. Quis massa amet purus sit diam neque eleifend lectus iaculis.</p>
				</div>
			</div>
		</div>
		<div class="journey__content">
			<span class="journey__content--year">2022</span>
			<div class="journey__content--list">
				<div class="journey__item">
				<span class="journey__item--step">
					<span class="step_circle">
						<span class="step_circle_inner">
						</span>
					</span>
					<span class="step_stick"></span>
				</span>
					<span class="journey__item--title">Working on there</span>
					<p class="journey__item--info">Lorem ipsum dolor sit amet consectetur. Fringilla eget imperdiet quis ullamcorper egestas. Potenti nibh orci pretium euismod tortor ipsum. Malesuada dolor id scelerisque viverra eleifend magna hendrerit viverra faucibus. Quis massa amet purus sit diam neque eleifend lectus iaculis.</p>
				</div>
				<div class="journey__item">
				<span class="journey__item--step">
					<span class="step_circle">
						<span class="step_circle_inner">
						</span>
					</span>
				</span>
					<span class="journey__item--title">Working on there</span>
					<p class="journey__item--info">Lorem ipsum dolor sit amet consectetur. Fringilla eget imperdiet quis ullamcorper egestas. Potenti nibh orci pretium euismod tortor ipsum. Malesuada dolor id scelerisque viverra eleifend magna hendrerit viverra faucibus. Quis massa amet purus sit diam neque eleifend lectus iaculis.</p>
				</div>
			</div>
		</div>
	</div>
</section>


<style lang="scss">
	.about {
		.section_desc {
			p {
				margin-top: 2rem;
			}
		}
	}
	.journey {
		margin-top: 75px;
		padding-bottom: 50px;
		&__content {
			display: flex;
			gap: 28px;
			&--year {
				font-size: 1.25rem;
				color: var(--color-text-1);
			}
			&--list {
				display: flex;
				flex-direction: column;
				gap: 30px;
			}
		}
		.journey_list {
			display: flex;
			flex-direction: column;
			gap: 50px;
		}
		&__item {
			position: relative;
			&--step {
				position: absolute;
				height: 100%;
				.step_circle {
					width: 21px;
					height: 21px;
					border-radius: 50%;
					border: 1px solid var(--color-blue);
					display: block;
					position: relative;
				}
				.step_circle_inner {
					width: 5px;
					height: 5px;
					border-radius: 50%;
					background-color: #fff;
					display: block;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
				.step_stick {
					width: 1px;
					background-color: var(--color-blue);
					display: block;
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					height: calc(100% - 21px + 30px);
				}
			}
			&--title {
				font-size: 1rem;
				color: var(--color-text-1);
				margin-left: 40px;
			}
			&--info {
				font-size: 0.875rem;
				margin-top: 10px;
				line-height: 1.3rem;
				margin-left: 40px;
			}
		}
	}
	.journey_list {
		margin-top: 55px;
	}
</style>