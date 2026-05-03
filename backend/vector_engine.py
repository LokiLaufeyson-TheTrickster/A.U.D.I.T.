import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import os

class VectorEngine:
    def __init__(self, model_name='all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(model_name)
        self.dimension = self.model.get_sentence_embedding_dimension()
        self.index = faiss.IndexFlatL2(self.dimension)
        self.metadata = []

    def get_embedding(self, text):
        return self.model.encode([text])[0]

    def add_to_index(self, text, meta):
        embedding = self.get_embedding(text).astype('float32')
        self.index.add(np.array([embedding]))
        self.metadata.append(meta)

    def search(self, text, top_k=5):
        if self.index.ntotal == 0:
            return []
        
        embedding = self.get_embedding(text).astype('float32')
        distances, indices = self.index.search(np.array([embedding]), top_k)
        
        results = []
        for i, idx in enumerate(indices[0]):
            if idx != -1:
                results.append({
                    "metadata": self.metadata[idx],
                    "distance": float(distances[0][i])
                })
        return results

vector_engine = VectorEngine()
