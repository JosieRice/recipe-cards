import db from "../firestore";

const recipe = (_: null, args: { collection: string; id: string }, context: any) => {
  return db
    .collection(context.uid)
    .doc(args.id)
    .get()
    .then((snap: any) => {
      const recipe = snap.data();
      recipe["id"] = args.id;
      return recipe;
    });
};

export default recipe;
