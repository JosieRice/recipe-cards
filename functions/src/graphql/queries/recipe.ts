import db from "../firestore";

const recipe = (_: null, args: { collection: string; id: string }) => {
  return db
    .collection(args.collection)
    .doc(args.id)
    .get()
    .then((snap: any) => {
      const recipe = snap.data();
      recipe["id"] = args.id;
      return recipe;
    });
};

export default recipe;
