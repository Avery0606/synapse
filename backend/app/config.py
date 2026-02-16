import os
import yaml

def load_config():
    """加载mem0配置文件，支持环境变量替换"""
    config_path = "mem0-config.yaml"
    with open(config_path, 'r', encoding='utf-8') as f:
        config_str = f.read()
    
    # 替换环境变量
    # 格式: ${ENV_VAR_NAME} 或 ${ENV_VAR_NAME:default_value}
    import re
    pattern = r'\$\{([^}:]+)(?::([^}]*))?\}'
    
    def replace_env_var(match):
        env_var = match.group(1)
        default_value = match.group(2)
        return os.environ.get(env_var, default_value or '')
    
    config_str = re.sub(pattern, replace_env_var, config_str)
    return yaml.safe_load(config_str)
