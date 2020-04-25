import db from "../firestore";

const recipe = (_: null, args: { collection: string; id: string }, context: any) => {

  const safeCollection = args.collection === 'original' ? 'original' : context.uid;
  return db
    .collection(safeCollection)
    .doc(args.id)
    .get()
    .then((snap: any) => {
      const recipe = snap.data();
      recipe["id"] = args.id;
      return recipe;
    });
};

export default recipe;
