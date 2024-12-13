type MongoDBOptions = {
    /**
     * The database to authenticate against (e.g., "admin").
     */
    authSource?: string;

    /**
     * Whether retryable writes are enabled. Acceptable values: "true" or "false".
     */
    retryWrites?: 'true' | 'false';

    /**
     * Specifies the write concern level (e.g., "majority").
     */
    w?: 'majority' | string;

    /**
     * Enable or disable SSL/TLS for the connection. Acceptable values: "true" or "false".
     */
    ssl?: 'true' | 'false';

    /**
     * Specifies the read preference for the connection.
     * Options: "primary", "secondary", "nearest", "primaryPreferred", "secondaryPreferred".
     */
    readPreference?: 'primary' | 'secondary' | 'nearest' | 'primaryPreferred' | 'secondaryPreferred';

    /**
     * Connection timeout in milliseconds.
     */
    connectTimeoutMS?: string;

    /**
     * Socket timeout in milliseconds.
     */
    socketTimeoutMS?: string;

    /**
     * The name of the replica set to connect to.
     */
    replicaSet?: string;

    /**
     * Specifies the authentication mechanism.
     * Options: "SCRAM-SHA-1", "SCRAM-SHA-256", "MONGODB-X509", "PLAIN", "GSSAPI".
     */
    authMechanism?: 'SCRAM-SHA-1' | 'SCRAM-SHA-256' | 'MONGODB-X509' | 'PLAIN' | 'GSSAPI';

    /**
     * The maximum number of connections in the connection pool.
     */
    maxPoolSize?: string;

    /**
     * The minimum number of connections in the connection pool.
     */
    minPoolSize?: string;

    /**
     * Whether to connect directly to a MongoDB server rather than via a replica set.
     * Acceptable values: "true" or "false".
     */
    directConnection?: 'true' | 'false';

    /**
     * Enable or disable TLS for the connection. Acceptable values: "true" or "false".
     */
    tls?: 'true' | 'false';

    /**
     * Additional custom options for MongoDB connections.
     */
    [key: string]: string | undefined;
};

/**
 * Converts a MongoDB options object into a query string for use in a connection URI.
 *
 * @param options - An object containing MongoDB connection options.
 * @returns A query string that can be appended to a MongoDB URI.
 *
 * @example
 * ```typescript
 * const options = { authSource: 'admin', retryWrites: 'true', w: 'majority' };
 * const queryString = mongoOptions(options);
 * console.log(queryString); // Output: "authSource=admin&retryWrites=true&w=majority"
 * ```
 */
export const mongoOptions = (options: MongoDBOptions): string => {
    return Object.entries(options)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`)
        .join('&');
};