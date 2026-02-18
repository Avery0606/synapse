import os
import yaml


def _load_prompt_file(prompt_path: str) -> str:
    """加载外部 prompt 文件"""
    if not prompt_path:
        return None
    
    # 支持相对路径和绝对路径
    if not os.path.isabs(prompt_path):
        # 相对于 backend 目录
        base_dir = os.path.dirname(os.path.abspath(__file__))
        prompt_path = os.path.join(base_dir, "..", prompt_path)
    
    prompt_path = os.path.normpath(prompt_path)
    
    if not os.path.exists(prompt_path):
        raise FileNotFoundError(f"Prompt file not found: {prompt_path}")
    
    with open(prompt_path, 'r', encoding='utf-8') as f:
        return f.read()


def load_config():
    """加载mem0配置文件，支持环境变量替换和外部prompt文件"""
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
    config = yaml.safe_load(config_str)
    
    # 加载外部 prompt 文件
    prompt_path = config.get("custom_fact_extraction_prompt")
    if prompt_path:
        config["custom_fact_extraction_prompt"] = _load_prompt_file(prompt_path)
    
    return config
