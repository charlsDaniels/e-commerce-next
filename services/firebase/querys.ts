import {
  addDoc, collection, CollectionReference, doc, DocumentData, getDoc,
  getDocs,
  query, where
} from "firebase/firestore";

import { firestore } from "./initialize";

import { Category } from '../../types/Category';
import { DBProduct } from '../../types/Product';

// This is just a helper to add the type to the db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(firestore, collectionName) as CollectionReference<T>
}

// export all your collections
export const productsCol = createCollection<DBProduct>('products')
export const categoriesCol = createCollection<Category>('categories')

const fetchCategories = () => {
  return getDocs(categoriesCol);
};

const fetchAllProducts = (categoryId: string = '') => {
  let response;

  if (categoryId) {
    const q = query(
      productsCol,
      where("categoryCode", "==", categoryId.toUpperCase())
    );
    response = getDocs(q);
  } else {
    response = getDocs(productsCol);
  }

  return response;
};

const fetchProductById = (productId: string | undefined) => {
  const productRef = doc(productsCol, productId);
  return getDoc(productRef);;
};

const addOrder = async (order: any) => {
  const orders = collection(firestore, "orders");
  return addDoc(orders, order);
};

export { fetchCategories, fetchAllProducts, fetchProductById, addOrder };

