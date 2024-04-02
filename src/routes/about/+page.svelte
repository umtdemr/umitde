<script>
	import JourneyJson from './journey.json';
	console.log(JourneyJson)
</script>

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
		{#each  JourneyJson.data as journeyData}
			<div class="journey__content">
				<span class="journey__content--year">{journeyData.year}</span>
				<div class="journey__content--list">
					{#each journeyData.content as journeyContent, index}
						<div class="journey__item">
							<span class="journey__item--step">
								<span class="step_circle">
									<span class="step_circle_inner">
									</span>
								</span>
								{#if index < journeyData.content.length - 1}
									<span class="step_stick"></span>
								{/if}
							</span>
							<span class="journey__item--title">{journeyContent.title}</span>
							<p class="journey__item--info">{journeyContent.desc}</p>
						</div>
					{/each}
				</div>
			</div>
		{/each}
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
			@media screen and (max-width: 790px) {
				flex-direction: column;
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