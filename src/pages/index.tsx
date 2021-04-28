export default function Home(props) {
  return (
    <div>
      <div>Index</div>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");

  return {
    props: {
      episodes: await response.json(),
    },
    revalidate: 360*8000,
  }
}
