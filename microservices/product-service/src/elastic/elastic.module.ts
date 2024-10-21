import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { ElasticsearchService } from "@nestjs/elasticsearch";

@Global()
@Module({
    imports: [
        ElasticsearchModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configSerivce: ConfigService) => ({
                node: configSerivce.get("ELASTIC_NODE"),
                auth: {
                    username: configSerivce.get("ELASTIC_USER"),
                    password: configSerivce.get("ELASTIC_PASS")
                },
                tls: {
                    rejectUnauthorized: false
                    
                }
            }),
            inject: [ConfigService]
        }),
    ],
    exports: [ElasticsearchModule]
})
export class ElasticModule { }