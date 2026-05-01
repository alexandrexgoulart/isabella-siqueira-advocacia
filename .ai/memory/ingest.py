import chromadb
from sentence_transformers import SentenceTransformer

# modelo de embeddings
model = SentenceTransformer("all-MiniLM-L6-v2")

# banco persistente
client = chromadb.Client(
    chromadb.config.Settings(
        persist_directory="./.ai/memory"
    )
)

collection = client.get_or_create_collection(name="project_memory")

def ingest_text(text):
    embedding = model.encode([text])[0].tolist()

    collection.add(
        documents=[text],
        ids=[str(hash(text))]
    )

if __name__ == "__main__":
    while True:
        text = input("Digite algo para salvar na memória: ")
        ingest_text(text)
        print("✅ Salvo!")