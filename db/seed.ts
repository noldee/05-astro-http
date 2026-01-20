import { getCollection } from "astro:content";
import { Clients, db, Posts } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
  // TODO
  await db.insert(Clients).values([
    { id: 1, name: "Kasim", age: 21, isActive: true },
    { id: 2, name: "Mina", age: 25, isActive: false },
    { id: 3, name: "Meliisa", age: 27, isActive: false },
    { id: 4, name: "Walter", age: 21, isActive: true },
  ]);

  const posts = await getCollection("blog");
  await db.insert(Posts).values(
    posts.map((p) => ({
      id: p.id,
      title: p.data.title,
      likes: Math.round(Math.random() * 100),
    })),
  );
}
