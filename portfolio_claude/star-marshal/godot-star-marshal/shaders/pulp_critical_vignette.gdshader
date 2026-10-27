shader_type canvas_item;

uniform float critical_intensity : hint_range(0.0, 1.0) = 0.0;
uniform float bullet_time_intensity : hint_range(0.0, 1.0) = 0.0;
uniform float time_sec = 0.0;

void fragment() {
    vec2 uv = UV;
    vec2 center_dist = uv - vec2(0.5);
    float dist = length(center_dist);
    
    // 1960s Ben-Day Halftone Dot Matrix (Rotated 45 degrees comic print screen)
    vec2 rot_coord = mat2(vec2(0.7071, -0.7071), vec2(0.7071, 0.7071)) * (uv * 280.0);
    vec2 grid_pos = fract(rot_coord) - vec2(0.5);
    float dot_radius = length(grid_pos);
    float halftone_dot = smoothstep(0.28, 0.20, dot_radius) * 0.09;
    
    // 1960s Pulp Scanlines
    float scanline = sin(uv.y * 850.0) * 0.03;
    
    // Red Pulsing Perimeter Vignette in Critical State (<15% HP)
    float pulse = 0.65 + 0.35 * sin(time_sec * 6.5);
    float vig = smoothstep(0.28, 0.78, dist) * critical_intensity * pulse;
    
    // Bullet-Time Teal/Amber Radial Tint
    float bt_vig = smoothstep(0.32, 0.82, dist) * bullet_time_intensity * 0.55;
    
    vec3 col = vec3(0.0);
    col += vec3(0.90, 0.14, 0.10) * vig;
    col += vec3(0.08, 0.42, 0.48) * bt_vig;
    col += vec3(0.05, 0.15, 0.20) * halftone_dot;
    
    float alpha = clamp(vig * 0.85 + bt_vig + abs(scanline) * 0.30 + halftone_dot, 0.0, 0.88);
    COLOR = vec4(col, alpha);
}
