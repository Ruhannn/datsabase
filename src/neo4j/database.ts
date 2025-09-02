import neo4j from 'neo4j-driver'

export const driver = neo4j.driver(
  process.env.NEO4J_URL!,
  neo4j.auth.basic('neo4j', process.env.NEO4J_PASSWORD!),
)
export const session = driver.session()
