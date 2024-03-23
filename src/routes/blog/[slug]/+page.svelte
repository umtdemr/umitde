<script>
    import PostFeatureMockImg from '$lib/images/post_mockup_featured_image.png';
</script>
<article class="post">
    <div class="post__header">
        <img src={PostFeatureMockImg} alt="post" />
        <h2>My new website</h2>
        <time class="post_item__footer--date" datetime="2024-03-21">March 21, 2024</time>
    </div>

    <div class="post__content">
        <p>
            Lorem ipsum dolor sit amet consectetur. Suspendisse id tristique sed pulvinar placerat hac dolor commodo. Non nisi tincidunt lectus tortor. Sed orci et risus blandit varius aenean aenean aenean in. In blandit sapien posuere urna. Nibh dictum auctor nisl cras scelerisque eget diam. Elit proin et morbi nisl felis. Mauris congue turpis turpis libero sagittis pellentesque ullamcorper.
            Et nulla sagittis cum ipsum et dis proin pellentesque aliquam. Nulla diam bibendum nisl nibh fames libero nunc. Morbi aliquet a nibh enim nibh. Tempus mi elit augue interdum lacus ultricies amet enim hendrerit. Urna tincidunt velit est sodales. Nibh leo magna pellentesque purus risus leo facilisi aliquam hendrerit. Diam ut a nec a fermentum adipiscing mattis netus cursus. Amet at risus venenatis eu. Ut id egestas enim convallis tellus at sed cras. Risus mauris mauris diam varius vestibulum nunc vulputate molestie pretium. Adipiscing vulputate in convallis in semper congue dolor magna ullamcorper. Morbi nisi at amet curabitur hendrerit gravida. Libero pulvinar nulla ac leo varius lacus vitae habitant. Ullamcorper in porttitor id lectus pellentesque at.
            Ipsum faucibus aliquet cras nec in mattis vestibulum. Purus dignissim nec et iaculis egestas tincidunt. Porttitor viverra pretium at nec feugiat. Sed convallis quis placerat suscipit. Lectus aliquam sed gravida enim cum volutpat. Scelerisque eu tincidunt integer erat vulputate ut quis et nam. Rhoncus massa eget interdum eu cras. Morbi volutpat quis faucibus senectus. Viverra id ut non pellentesque velit consectetur eu habitasse venenatis. Est cras nibh suscipit quisque accumsan tellus. Tempor convallis tellus tincidunt in dui lorem lorem natoque arcu.
            Tincidunt neque in massa aliquet lacus viverra et nisl sit. Posuere nunc viverra mauris ut. Morbi blandit pharetra tortor nullam. Netus vulputate id hac diam sit eu. Mattis eget leo amet purus egestas duis. Vitae integer massa amet lacus sem maecenas porta. Proin lobortis convallis malesuada erat a vulputate. Lorem orci felis velit non sed. Vitae et vestibulum mauris justo vel feugiat. Rhoncus mauris blandit sed sed. Sit aliquet euismod purus enim urna a dignissim accumsan. In mattis magnis aliquet nulla at risus consequat massa lobortis. Cursus ullamcorper elementum phasellus pretium leo pulvinar malesuada urna. Ultrices id aliquam dui mattis feugiat.
            Nulla lacus eros ut libero consequat risus augue pulvinar gravida. Ipsum nibh dictum aliquam congue erat. Ultricies eget eu sagittis et. Eleifend tortor viverra penatibus sociis. Commodo dignissim sit blandit tristique viverra. Nec egestas elit pellentesque venenatis lorem et. Interdum at suspendisse ridiculus purus tincidunt volutpat ipsum sed mi. Aliquam nisl tristique feugiat nunc netus. Placerat et et et aliquam. Mi in vel posuere sodales proin fringilla orci. Integer quis id phasellus non suscipit amet vitae proin quis. Lobortis mattis eget eget dignissim. Adipiscing massa tellus ullamcorper pharetra nunc. Etiam id ultricies nibh consectetur. Sem eget nisl aenean sed enim parturient vitae nec risus.
        </p>
    </div>
</article>
<div class="separator"></div>
<div class="post_edit">
    Find an issue with this post? You can <a href="#">edit on github.</a>
</div>


<style lang="scss">
    .post {
      width: 100%;
      &__header {
        h2 {
          color: var(--color-text-1);
          font-size: 1.875rem;
          margin-top: 10px;

        }
        time {
          color: var(--color-text-2);
          font-size: 0.812rem;
          margin-top: 5px;
        }
      }
      &__content {
        margin-top: 50px;
        font-size: 1.15rem;
        line-height: 1.5rem;
      }
  }
    .separator {
      width: 100%;
      height: 2px;
      border-radius: 10px;
      background-color: var(--color-dark-3);
      margin: 50px 0;
    }
    .post_edit {
      padding: 40px 0;
      text-align: center;
      border: 1px solid var(--color-dark-2);
      a {
        text-decoration: underline;
      }
    }
</style>